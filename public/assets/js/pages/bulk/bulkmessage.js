'use strict'

const maxlenght = 1000
const base_url = $('#base_url').val()
const csrf = $('input[name=_token]').val()
const form_link = $('#bulk_message_link').val()

$('.csv').on('change', function () {
    $('.tbody').html('')
    var files = event.target.files
    var file = files[0]

    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function (event) {
        var csv = event.target.result
        var data = $.csv.toArrays(csv)
        var totalRows = data.length

        var rows = $('.rows').length

        let device = $('#device_import').val()
        let device_number = $('#device_import option:selected').text()
        var isCrossed = false

        $.each(data, function (key, item) {
            var is_valid = true

            if (isExist(item[0]) == false) {
                is_valid = false
            }

            if (is_valid == true) {
                key = rows++
                var html = `<tr class="row${key} rows" data-row="${key}">

				<td class="col-3"><span class="receiver_user">${item[0]}</span>
				<a href="javascript:void(0)" data-target=".row${key}" class="btn btn-outline-danger remove btn-sm remove_btn_${key}"><i class="fa fa-trash"></i></a>
				<input type="hidden" name="phone" value="${item[0]}" class="number_${key}" required="">
				</td>
				<td class="col-2">
				${device_number}
				<input type="hidden" name="device" value="${device}" class="device_${key}" required="">
				</td>
				<td class="col-5"><textarea class="form-control message_${key}" name="message" required="">${item[1]}</textarea></td>
				<td class="col-2"><span class="badge badge-warning badge_${key}">Waiting</span></td>

				</tr>`

                $('.tbody').append(html)
            }
        })
        $('.total_records').html($('.rows').length)
    }
})

$(document).on('click', '.remove', function () {
    var row = $(this).data('target')
    $(row).remove()
    $('.total_records').html($('.rows').length)
})

$(document).on('click', '.add_custom_row', function () {
    var is_valid = true

    if ($('#to').val() == null || $('#to').val() == '') {
        is_valid = false
        $('.to_alert').show()
    } else {
        $('.to_alert').hide()
    }

    if ($('#wa_message').val() == null || $('#wa_message').val() == '') {
        is_valid = false
        $('.message_alert').show()
    } else {
        $('.message_alert').hide()
    }

    let device = $('#device_custom').val()
    let device_number = $('#device_custom option:selected').text()

    if (isExist($('#to').val()) == false) {
        is_valid = false
    }

    if (is_valid == true) {
        var numbers = $('#to').val()
        var numbersArr = numbers.split(',')

        console.log(numbersArr)

        $(numbersArr).each(function (numberKey, number) {
            var numberWithSpace = number
            var numberWitOutSpace = numberWithSpace.replace(/\s/g, '')
            var parsedPhone = parseInt(numberWitOutSpace)

            if (!isNaN(parsedPhone) && parsedPhone.toString() === number) {
                console.log(parsedPhone)
                if (isExist(parsedPhone)) {
                    var rows = $('.rows').length
                    rows++

                    var html = `<tr class="row${rows} rows" data-row="${rows}">
					
					<td class="col-3"><span class="receiver_user">${parsedPhone}</span>
					<a href="javascript:void(0)" data-target=".row${rows}" class="btn btn-outline-danger remove btn-sm remove_btn_${rows}"><i class="fa fa-trash"></i></a>
					<input type="hidden" name="phone" value="${parsedPhone}" class="number_${rows}" required="">
					</td>
					<td class="col-2">
					${device_number}
					<input type="hidden" name="device" value="${device}" class="device_${rows}" required="">
					</td>
					<td class="col-5"><textarea class="form-control message_${rows}" name="message" required="">${$(
                        '#wa_message'
                    ).val()}</textarea></td>
					<td class="col-2 "><span class="badge badge-warning badge_${rows}">Waiting</span></td>

					</tr>`

                    $('.tbody').append(html)

                    $('.total_records').html($('.rows').length)
                }
            }
        })

        $('#to').val('')
        $('#wa_message').val('')
        ToastAlert('success', 'New Contact Added Successfully')
    }
})

var sendble_rows = []
function arrayRemove(value) {
    sendble_rows = sendble_rows.filter(function (ele) {
        return ele != value
    })
}

function isExist(to) {
    var is_valid = true
    var is_crossed = false

    var rows = 0
    $('.receiver_user').each(function (key, item) {
        if ($(this).text().replace(' ', '') == to) {
            ToastAlert('error', `(${to}) contact number already added`)
            is_valid = false
        } else {
            rows++
            if (rows >= maxlenght) {
                is_valid = false
                ToastAlert('error', 'Maximum Sender Limit is ' + maxlenght)
            }
        }
    })

    return is_valid
}

$(document).on('click', '.send_now', function () {
    $('.rows').each(function (index, row) {
        sendble_rows.push($(this).data('row'))
    })
    if (sendble_rows.length > 0) {
        $('.send_now').attr('disabled', 'disable')
        submitRequests(sendble_rows[0])
    } else {
        $('.send_now').removeAttr('disabled')
        ToastAlert('error', 'No Record Avaible For Sent A Request')
    }
})

$('#device_import').on('change', function () {
    $(this).val() != '' ? $('.csv_row').show() : $('.csv_row').hide()
})

$('#selectall').on('change', function () {
    if ($(this).is(':checked')) {
        $('.receivers-list').hide()
    } else {
        $('.receivers-list').show()
    }
})

$('.contact-list-form').on('submit', function (e) {
    e.preventDefault()
    var contacts = $('#wa-contacts').find(':selected').data('contacts')

    var contactsNumbers = []

    $(contacts).each(function (index, row) {
        contactsNumbers.push(row.phone)
    })

    if (contactsNumbers.length == 0) {
        ToastAlert('error', 'No receivers found')

        return false
    }

    var rows = $('.rows').length

    let device = $('#wa-device').val()
    let device_number = $('#wa-device option:selected').text()
    var isCrossed = false

    $.each(contactsNumbers, function (key, item) {
        var is_valid = true

        if (isExist(item) == false) {
            is_valid = false
        }

        if (is_valid == true) {
            key = rows++
            var html = `<tr class="row${key + 1000} rows" data-row="${key + 1000}">

			<td class="col-3"><span class="receiver_user">${item}</span>
			<a href="javascript:void(0)" data-target=".row${key + 1000}" class="btn btn-outline-danger remove btn-sm remove_btn_${
                key + 1000
            }"><i class="fa fa-trash"></i></a>
			<input type="hidden" name="phone" value="${item}" class="number_${key + 1000}" required="">
			</td>
			<td class="col-2">
			${device_number}
			<input type="hidden" name="device" value="${device}" class="device_${key + 1000}" required="">
			</td>
			<td class="col-5"><textarea class="form-control message_${key + 1000}" name="message" required="">${$(
                '#wa_temp_message'
            ).val()}</textarea></td>
			<td class="col-2"><span class="badge badge-warning badge_${key + 1000}">Waiting</span></td>

			</tr>`

            $('.tbody').append(html)
        }
    })
    $('.total_records').html($('.rows').length)
})

var total_sent = 0

function submitRequests(param) {
    const phone_num = $('.number_' + param).val()
    const message = $('.message_' + param).val()
    const device = $('.device_' + param).val()

    if (phone_num == '') {
        $('.send_now').removeAttr('disabled')
        return ToastAlert('error', 'Add an whatsapp phone number')
    }
    if (message == '') {
        $('.send_now').removeAttr('disabled')
        return ToastAlert('error', 'Add some Message')
    }
    if (device == '') {
        $('.send_now').removeAttr('disabled')
        return ToastAlert('error', 'Select a device')
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })
    $.ajax({
        type: 'POST',
        url: form_link,
        data: { phone: phone_num, device: device, message: message },
        dataType: 'json',
        beforeSend: function () {
            $('.message_' + param).attr('disabled', 'disable')
            $('.badge_' + param).html('Sending....')
            $('.send_now').attr('disabled', 'disable')
            $('#add_record').attr('disabled', 'disable')
            $('#import_record').attr('disabled', 'disable')
        },
        success: function (response) {
            arrayRemove(param)
            $('.badge_' + param).removeClass('badge-warning')
            $('.badge_' + param).removeClass('badge-danger')
            $('.badge_' + param).addClass('badge-success')
            $('.badge_' + param).html('Sent..')
            $('.remove_btn_' + param).remove()
            $('.row' + param).removeClass('rows')
            $('.number_' + param).removeClass('number_' + param)
            $('.message_' + param).removeClass('message_' + param)

            if (sendble_rows.length != 0) {
                submitRequests(sendble_rows[0])
            }
            total_sent++
            $('.total_sent').text(total_sent)

            $('#add_record').removeAttr('disabled')
            $('#import_record').removeAttr('disabled')
        },
        error: function (xhr, status, error) {
            $('.message_' + param).removeAttr('disabled')
            $('.badge_' + param).removeClass('badge-warning')
            $('.badge_' + param).addClass('badge-danger')
            $('.badge_' + param).html('Request Failed :(')
            $('.send_now').removeAttr('disabled')
            $('#add_record').removeAttr('disabled')
            $('#import_record').removeAttr('disabled')
            //Notify('error', xhr);
            arrayRemove(param)
            if (sendble_rows.length != 0) {
                submitRequests(sendble_rows[0])
            }
            total_sent++
        },
    })
}

//#region Send Group Messages
let msgGroups = []

$('.contact-group-form').on('submit', function (e) {
    e.preventDefault()
    var groupId = $('#wa-contacts').val()

    var i = msgGroups.findIndex((x) => x.id == groupId)
    if (i >= 0) {
        ToastAlert('error', 'Group Already Added')
        return false
    }
    LoadContact(groupId)
    $('#import-from-contact').modal('hide')
})

function LoadContact(groupId, page = 1) {
    $.ajax({
        url: base_url + '/user/get-group-contacts/' + groupId + '/25000?page=' + page,
        success: function (resp) {
            var i = msgGroups.findIndex((x) => x.id == groupId)
            let _msgGroup
            if (i >= 0) {
                _msgGroup = msgGroups[i];
                _msgGroup.pagesloaded = page;
                _msgGroup.contacts = _msgGroup.contacts.concat(resp.Contacts);
            } else {
                _msgGroup={
                    id: groupId,
                    name: $('#wa-contacts option:selected').text(),
                    message: $('#wa_temp_message').val(),
                    device: $('#wa-device').val(),
                    total: resp.Count,
                    pagesloaded: page,
                    contacts: resp.Contacts, // Use the cloned array
                };
                msgGroups.push(_msgGroup);
                ToastAlert('success', 'Imported Successfully')
            }

            if (_msgGroup.contacts.length < _msgGroup.total) {
                LoadContact(groupId, page + 1)
            }
        },
    })
}

function updateHtml() {
    var i = msgGroups.findIndex((x) => x.status == Statuses.Sending)

    if (i >= 0) {
        $('.send_group_now').attr('disabled', 'disable')
    } else {
        $('.send_group_now').removeAttr('disabled')
    }

    var html = ''
    $.each(msgGroups, function (key, item) {
        let prog = `<span class="badge badge-warning">Waiting</span>`
        if (item.status == Statuses.Sending) {
            prog = ` <span class="badge badge-primary">Total : ${item.total} </span> 
					 <span class="badge badge-success">Sent : ${
                         item.contacts.filter((contact) => contact.status == Statuses.Sent).length
                     } </span>
					 <span class="badge badge-warning">Remaining : ${
                         item.contacts.filter((contact) => contact.status != Statuses.Sent).length
                     } </span>  `
        }
        if (item.status == Statuses.Sent) {
            prog = `<span class="badge badge-success">Sent : ${item.total} </span> `
        }
        html += `
			<tr class="row${key + 786} rows" data-row="${key + 786}">
				<td class="col-3">${item.name} <a href="javascript:void(0)" onclick="RemoveGroup(${item.id},'${
            item.message
        }')" class="btn btn-outline-danger removegroup btn-sm"><i class="fa fa-trash"></i></a></td>
				<td class="col-5" style="white-space:pre-line" >${item.message}</td>
				<td class="col-2"> ${prog} </td>
			</tr>
			`
    })

    $('.tbody').html(html)
}

function RemoveGroup(id, msg) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This record will be deleted wath all progress',
        type: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonClass: 'btn btn-secondary',
    }).then((result) => {
        if (result.value) {
            msgGroups = msgGroups.filter((x) => x.id != id || x.message != msg)
        }
    })
}

$(document).on('click', '.send_group_now', function () {
    var i = msgGroups.findIndex((x) => x.status != Statuses.Sent)
    if (i >= 0) {
        updateHtml()
        SendNext(msgGroups[i])
    } else {
        ToastAlert('error', 'No Record Avaible to send a request')
    }
})

function submitGroupMessages(group, contactIndex) {
    group.status = Statuses.Sending
    const phone_num = group.contacts[contactIndex].phone
    const message = group.message
    const device = group.device

    if (phone_num == '' || message == '') {
        group.contacts[contactIndex].status = Statuses.Invalid
        SendNext(group)
        return
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
    })
    $.ajax({
        type: 'POST',
        url: form_link,
        data: { phone: phone_num, device: device, message: message },
        dataType: 'json',
        beforeSend: function () {
            group.contacts[contactIndex].status = Statuses.Sending
        },
        success: function (response) {
            group.contacts[contactIndex].status = Statuses.Sent
            SendNext(group)
        },
        error: function (xhr, status, error) {
            group.contacts[contactIndex].status = Statuses.Failed
            group.contacts[contactIndex].status = Statuses.Sent
            SendNext(group)
        },
    })
}

function SendNext(group) {
    var i = group.contacts.findIndex((x) => !x.status)
    if (i >= 0) {
        submitGroupMessages(group, i)
    } else {
        group.status = Statuses.Sent
        var ig = msgGroups.findIndex((x) => x.status != Statuses.Sent)
        if (ig > 0) {
            submitGroupMessages(msgGroups[ig], 0)
        }
    }
}

const Statuses = {
    Invalid: 0,
    Sending: 1,
    Sent: 2,
    Failed: 3,
}
$(document).ready(function () {
    setInterval(function () {
        updateHtml()
    }, 1000)
})
//#endregion
