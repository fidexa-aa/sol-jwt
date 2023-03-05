const fetch = require("node-fetch")
const fs = require("fs")
const DATAFILENAME = "./jwksData.json"
const { JWKSAddr, accessedKeys } = {}

const getKeysFromGoogle = async () => {
    return await fetch("https://www.googleapis.com/oauth2/v3/certs").then(r => (r.json()))
}

const base64UrltoHexParse = (data) => {
    data = data.replaceAll("-", "+")
    data = data.replaceAll("_", "/")
    const buffer = Buffer.from(data, 'base64');
    return "0x" + buffer.toString('hex');
}

const parseKeys = (keys) => {
    return keys.map(({ kid, n }) => ({
        kid,
        mod: base64UrltoHexParse(n)
    }))
}


const loadJWKS = async () => {
    const JWKSContract = artifacts.require("JWKS");

    let JWKS
    try {
        JWKS = await JWKSContract.at(JWKSAddr)

    }
    catch {
        JWKS = await JWKSContract.new();
    }
    return JWKS
}


const runCleanUp = ({ address }, keys) => {
    let deployedKeys = accessedKeys ? accessedKeys : {}

    keys.forEach(({ kid, mod }) => {
        deployedKeys[kid] = mod
    })
    const out = JSON.stringify({ JWKSAddr: address, accessedKeys: deployedKeys })
    fs.writeFileSync(`./scripts/${DATAFILENAME.slice(2)}`, out)
}

const getAndProcessKeys = async () => {
    const { keys: rawkeys } = await getKeysFromGoogle()
    const keys = parseKeys(rawkeys)

    return keys

}

const addKeysToJWKSContract = async (JWKS, keys) => {
    await Promise.all(keys.map(async ({ kid, mod }) => {
        await JWKS.addKey(
            kid,
            mod
        );
    }))
}

async function main() {
    const keys = await getAndProcessKeys()

    const JWKS = await loadJWKS()

    await addKeysToJWKSContract(JWKS, keys)

    runCleanUp(JWKS, keys)
}


module.exports = function (cb) {
    main().then(() => cb()).catch(err => cb(err));
}