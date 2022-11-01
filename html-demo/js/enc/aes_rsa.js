/**
 * AES加密解密
 */
var aesUtil = {
    bits: 16,
    random: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",

    //获取key，
    genKey: function(length = aesUtil.bits) {
        let str = "";
        for (let i = 0; i < length; i++) {
            str = str + aesUtil.random.charAt(Math.random() * aesUtil.random.length)
        }
        return str;
    },

    //加密
    encrypt: function(plaintext, key) {
        if (plaintext instanceof Object) {
            //JSON.stringify
            plaintext = JSON.stringify(plaintext)
        }
        let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },

    //解密
    decrypt: function(ciphertext, key) {
        let decrypt = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        let decString = CryptoJS.enc.Utf8.stringify(decrypt).toString();
        if (decString.charAt(0) === "{" || decString.charAt(0) === "[") {
            //JSON.parse
            decString = JSON.parse(decString);
        }
        return decString;
    }
};

/**
 * RSA加密解密
 */
var rsaUtil = {
    //RSA 位数，这里要跟后端对应
    bits: 1024,

    //当前解密JSEncrypted对象
    decoder: null,

    // 生成公钥
    genPk: function(size = rsaUtil.bits) {
        rsaUtil.genDecoder();
        return rsaUtil.decoder.getPublicKey();
    },

    genDecoder: function(size = rsaUtil.bits) {
        if (!rsaUtil.decoder) {
            rsaUtil.decoder = new JSEncrypt({
                default_key_size: size
            });
        }
    },

    //私钥解密
    decrypt: function(ciphertext) {
        let decString = rsaUtil.decoder.decrypt(ciphertext);
        if (decString.charAt(0) === "{" || decString.charAt(0) === "[") {
            //JSON.parse
            decString = JSON.parse(decString);
        }
        return decString;
    },

    //当前加密JSEncrypted对象
    encoder: null,

    genEncoder: function (size = rsaUtil.bits) {
        if (!rsaUtil.encoder) {
            rsaUtil.encoder = new JSEncrypt({
                default_key_size: size
            });
        }
    },

    //公钥加密
    encrypt: function(plaintext, publicKey) {
        rsaUtil.genEncoder();
        rsaUtil.encoder.setPublicKey(publicKey);
        if (plaintext instanceof Object) {
            //1、JSON.stringify
            plaintext = JSON.stringify(plaintext)
        }
        return rsaUtil.encoder.encrypt(plaintext);
    },
};