'use strict'

const device_id = $('#uuid').val()
const base_url = $('#base_url').val()
const whatsappicon = base_url + '/assets/img/whatsapp.png'

checkSession()

function checkSession() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })
    $.ajax({
        type: 'POST',
        url: base_url + '/user/check-session/' + device_id,
        dataType: 'json',
        success: function (response) {
            if (response.connected === true) {
                $('.server_disconnect').remove()
                $('.qr-area').remove()
                $('.chat-messages').removeClass('loading')
                NotifyAlert('success', null, response.message)
                getChatList()
                startChatsListReload()
            } else {
                NotifyAlert('error', null, 'device not ready for sending message')
            }
        },
        error: function (xhr, status, error) {
            if (xhr.status == 500) {
                const image = `<img src="${base_url}/uploads/disconnect.webp" class="w-50"><br>`
                $('.qr-area').html(image)
                $('.server_disconnect').show()
            }
        },
    })
}

function getChatList() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })
    $.ajax({
        type: 'POST',
        url: base_url + '/user/get-chats/' + device_id,
        dataType: 'json',
        success: function (response) {
            const chats = sortByKey(response.chats, 'timestamp')
            $('.qr-area').remove()

            $.each(response.chats, function (key, item) {
                if (item.timestamp > 0) {
                    var time = formatTimestamp(item.timestamp)
                    time = `<span class="text-success">${time}</span>`
                } else {
                    var time = ''
                }

                var html = `<li class="list-group-item px-0 contact wa-link contact${key}" data-active=".contact${key}" data-id="${
                    item.id
                }" data-number="${item.number}">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <a href="javascript:void(0)"class="avatar rounded-circle  ml-2">
                                            <img alt="" src="${whatsappicon}">
                                        </a>
                                    </div>
                                    <div class="col ml--2">
                                        <h4 class="mb-0">
                                            <a id="nameNumber" href="javascript:void(0)">+${item.number}</a>
                                        </h4>
                                        ${time}
                                    </div>
                                    ${
                                        item.unread > 0
                                            ? `<div class="col pr-4 text-right"> <span style="background-color: #2aa81a;color:white;padding: 4px;border-radius: 7px;"  >${item.unread}</span> </div>`
                                            : ``
                                    }
                                </div>
                            </li>`

                $('.contact-list').append(html)
            })
        },
        error: function (xhr, status, error) {
            if (xhr.status == 500) {
            }
        },
    })
    $.ajax({
        type: 'GET',
        url: base_url + '/user/device/contacts/' + device_id,
        dataType: 'json',
        success: function (response) {
            d = response.data
            $.each(response.data, function (i, v) {
                if (v.notify || v.name) {
                    let $el = $('[data-number="' + i.split('@')[0] + '"]').find('#nameNumber')
                    let html = (v.name ? v.name : '(' + v.notify + ')') + '<br/>+' + i.split('@')[0]
                    $el.html(html)
                }
            })
        },
    })
}
let d
function successCallBack() {
    $('#jzForm')[0].reset();
    $('#select-type').change();
}

$(document).on('click', '.wa-link', function () {
    const phone = $(this).data('number')
    const activeTarget = $(this).data('active')
    var id = $(this).data('id')

    $('.contact').removeClass('active')
    $(activeTarget).addClass('active')
    $('.chat-list').html(phone)
    $('.sendble-row').removeClass('none')
    $('.reciver-number').val(phone)
    $('.chat-messages').addClass('loading')
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })
    $.ajax({
        type: 'POST',
        url: base_url + '/user/get-chats-messages',
        data: {
            id: id,
            device_id: device_id,
        },
        dataType: 'json',
        success: function (response) {
            $('.chat-messages').removeClass('loading')
            var html = ``
            $.each(response.data, function (i, v) {
                html += `<div class="message ${v.key.fromMe ? 'user-message' : 'other-message'}">
                            <div class="message-text">${GetMessageContent(v)}</div>
                            <div class="message-time">${convertTimestampToTime(v.messageTimestamp)}</div>
                        </div>`
            })
            $('.chat-container').html(html)
            startChatReload(id)
            scrollToBottom()
            console.log(response)
        },
        error: function (xhr, status, error) {},
    })
})
var chatReloadInterval, chatListReloadInterval

function startChatReload(id) {
    stopChatReload()
    chatReloadInterval = setInterval(function () {
        if (IfSameChatIsOpen(id)) {
            ReloadChatMessages(id)
        }
    }, 15000)
}

function startChatsListReload() {
    chatListReloadInterval = setInterval(function () {
        getChatList()
    }, 5 * 60 * 1000)
}

function IfSameChatIsOpen(id) {
    var number = id.split('@')[0]
    return $('.reciver-number').val() == number
}

function stopChatReload() {
    clearInterval(chatReloadInterval)
}
function ReloadChatMessages(id) {
    $.ajax({
        type: 'POST',
        url: base_url + '/user/get-chats-messages',
        data: {
            id: id,
            device_id: device_id,
        },
        dataType: 'json',
        success: function (response) {
            if (IfSameChatIsOpen(id)) {
                var html = ''
                $.each(response.data, function (i, v) {
                    html += `<div class="message ${v.key.fromMe ? 'user-message' : 'other-message'}">
                                <div class="message-text">${GetMessageContent(v)}</div>
                                <div class="message-time">${convertTimestampToTime(v.messageTimestamp)}</div>
                            </div>`
                })
                $('.chat-container').html(html)
            }
        },
        error: function (xhr, status, error) {},
    })
}

function GetMessageContent(v) {
    try {
        if (v?.messageStubType) {
            if (v.messageStubType == 'E2E_ENCRYPTED')
                return `<span style='font-style:italic' >-- This Chat is End-To-End Encrypted --</span>`
            if (v.messageStubType == 'CALL_MISSED_VOICE')
                return `<span style='font-style:italic' >-- Missed Voice Call --</span>`
            if (v.messageStubType == 'REVOKE') return `<span style='font-style:italic' >-- Message Deleted --</span>`
        }
        if (v?.message?.conversation) {
            return v?.message?.conversation
        }
        if (v?.message?.audioMessage) {
            return `<span style='font-style:italic' >-- Audio Message --</span>`
        }
        if (v?.message?.imageMessage) {
            return `<span style='font-style:italic' >-- Image Message --</span>`
        }
        if (v?.message?.documentMessage) {
            return `<span style='font-style:italic' >-- Document / File --</span>`
        }
        if (v?.message.extendedTextMessage) {
            return v?.message.extendedTextMessage.text
        }
        if (v?.message.listMessage) {
            return `<div>
            <b style='font-size:18px'>${v?.message.listMessage.title} </b>
            <span>${v?.message.listMessage.description} </span>
            <span>${v?.message.listMessage.footerText} </span>
            </div>`
        }
        if (v?.message.protocolMessage) {
            return v?.message.protocolMessage.type
        }
        return 'N/A'
    } catch (err) {
        return err
    }
}
function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
    const period = hours < 12 ? 'AM' : 'PM'
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`
    return formattedTime
}

function scrollToBottom() {
    var chatContainer = $('.chat-container')
    chatContainer.scrollTop(chatContainer.prop('scrollHeight'))
}
$(document).on('change', '#select-type', function () {
    var type = $(this).val()

    if (type == 'plain-text') {
        $('#plain-text').show()
        $('#templates').hide()
        $('#mediaFile').hide()
    } else if (type == 'media-text') {
        $('#mediaFile').show()
        $('#plain-text').show()
        $('#templates').hide()
    } else {
        $('#mediaFile').hide()
        $('#plain-text').hide()
        $('#templates').show()
    }
})

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return x > y ? -1 : x < y ? 1 : 0
    })
}

function formatTimestamp(unixTimestamp) {
    var d = new Date() // Gets the current time
    var nowTs = Math.floor(d.getTime() / 1000) //
    var seconds = nowTs - unixTimestamp

    // more that two days
    if (seconds > 2 * 24 * 3600) {
        return 'a few days ago'
    }
    // a day
    if (seconds > 24 * 3600) {
        return 'yesterday'
    }

    if (seconds > 3600) {
        return 'a few hours ago'
    }
    if (seconds > 1800) {
        return 'Half an hour ago'
    }
    if (seconds > 60) {
        return Math.floor(seconds / 60) + ' minutes ago'
    }

    return 'Few seconds ago'
}
