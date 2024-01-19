'use strict'

//#region Send Group Messages
let _msgGroup
const base_url = $('#base_url').val()
const form_link = $('#form_link').val()

$(document).on('click', '.send_now', async function (e) {
    e.preventDefault()
    $(this).hide()
    $('.sending').show()
    await LoadContact(_group.id)
})

async function LoadContact(groupId, page = 1) {
    $.ajax({
        url: base_url + '/user/get-group-contacts/' + groupId + '/25000?page=' + page,
        success: async function (resp) {
            if (_msgGroup) {
                _msgGroup.pagesloaded = page
                _msgGroup.contacts = _msgGroup.contacts.concat(resp.Contacts)
            } else {
                _msgGroup = {
                    id: groupId,
                    name: $('#wa-contacts option:selected').text(),
                    message: $('#wa_temp_message').val(),
                    device: $('#wa-device').val(),
                    total: resp.Count,
                    pagesloaded: page,
                    contacts: resp.Contacts, // Use the cloned array
                }
                await SendNext()
            }

            if (_msgGroup.contacts.length < _msgGroup.total) {
                await LoadContact(groupId, page + 1)
            }
        },
    })
}
async function submitGroupMessages(contactIndex) {
    let group = _msgGroup
    group.status = Statuses.Sending
    const phone_num = group.contacts[contactIndex].id

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })

    $.ajax({
        type: 'POST',
        url: form_link,
        data: { contact: phone_num, device: _device.id, template: _template.id },
        dataType: 'json',
        beforeSend: function () {
            group.contacts[contactIndex].status = Statuses.Sending
        },
        success: async function (response) {
            group.contacts[contactIndex].status = Statuses.Sent
            await SendNext()
            ToastAlert('success', group.contacts[contactIndex].phone + ' => Sent Successfully')
            return
        },
        error: async function (err) {
            group.contacts[contactIndex].status = Statuses.Failed
            await SendNext()
            if (err.responseJSON?.response?.message) {
                ToastAlert('error', group.contacts[contactIndex].phone + ' => ' + err.responseJSON?.response?.message)
            }
            return
        },
    })
}

async function SendNext() {
    Update()
    var i = _msgGroup.contacts.findIndex((x) => !x.status)
    if (i >= 0) {
        await submitGroupMessages(i)
    } else {
        ToastAlert('success', 'All messages are Completed')
    }
    return
}

function Update() {
    let sent = _msgGroup.contacts.filter((contact) => contact.status == Statuses.Sent).length
    let failed = _msgGroup.contacts.filter((contact) => contact.status == Statuses.Failed).length

    $('.total_sent').text(sent)
    $('.total-faild').text(failed)
}

const Statuses = {
    Invalid: 0,
    Sending: 1,
    Sent: 2,
    Failed: 3,
}
