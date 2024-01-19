@extends('layouts.main.app')
@section('head')
@include('layouts.main.headersection',[
'title' => __('Chat List'),
'buttons'=>[
[
'name'=> __('Devices List'),
'url'=> route('user.device.index'),
]
]])
@endsection
@push('css')
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/qr-page.css') }}">
@endpush
@section('content')
<style>
	.list-group .active {
		background-color: #c4e3da !important;
	}

	.chat-messages.loading .chat-loader {
		display: block;
	}

	.chat-messages .chat-loader,
	.chat-messages.loading .chat-container {
		display: none;
	}

	.chat-container {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		max-height: 550px;
		overflow-y: scroll;
	}

	.message {
		margin: 10px;
		padding: 10px;
		border-radius: 8px;
		max-width: 70%;
	}

	.message-text {
		white-space: pre-line;
	}

	.user-message {
		background-color: #066756;
		color: #fff;
		align-self: flex-end;
	}

	.other-message {
		background-color: #ecf0f1;
		color: #333;
		align-self: flex-start;
	}

	.message-time {
		font-size: 12px;
		font-weight: 500;
		color: #7e7397;
		text-align: end;
	}

	.mw-100px {
		max-width: 150px;
	}

	.user-message .message-time {
		color: #d1ced9;
	}
</style>
<div class="card">
	<div class="card-body position-relative">
		<div class="row">
			@if(getUserPlanData('access_chat_list') == true)
			<div class="col-sm-4">
				<div class="form-group">
					<input type="text" data-target=".contact" class="form-control filter-row"
						placeholder="{{ __('Search....') }}">
				</div>
				<div class="d-flex justify-content-center qr-area">
					<div class="justify-content-center">
						&nbsp&nbsp
						<div class="spinner-grow text-primary" role="status">
							<span class="sr-only">{{ __('Loading...') }}</span>
						</div>
						<br>
						<p><strong>{{ __('Loading Contacts.....') }}</strong></p>
					</div>

				</div>
				<div class="alert bg-gradient-red server_disconnect none text-white" role="alert">
					{{ __('Opps! Server Disconnected 😭') }}
				</div>
				<ul class="list-group list-group-flush list my--3 contact-list mt-5 position-relative">
				</ul>
			</div>
			<div class="col-sm-8 mt-5">
				<div class="chat-messages">
					<div class="chat-loader">
						<div class="d-flex justify-content-center">
							<div class="justify-content-center">
								&nbsp&nbsp
								<div class="spinner-grow text-primary" role="status">
									<span class="sr-only">{{ __('Loading...') }}</span>
								</div>
								<br>
								<p><strong>{{ __('Loading Chats.....') }}</strong></p>
							</div>
						</div>
					</div>

					<div class="chat-container">
						<div class="text-center">
							<img src="{{ asset('assets/img/whatsapp-bg.png') }}" class="wa-bg-img">
						</div>

					</div>
				</div>
				<form method="post" id="jzForm" class="ajaxform" action="{{ route('user.chat.send-message',$device->uuid) }}">
					@csrf
					<div class="form-group mb-5  none sendble-row">
						<input type="hidden" class="reciver-number" readonly="" name="reciver" value="">
					</div>
					<div class="input-group none sendble-row">
						<select class="form-control mw-100px" name="selecttype" id="select-type">
							<option value="plain-text">{{ __('Plan Text') }}</option>
							<option value="media-text">{{ __('Text With Media') }}</option>
							@if(count($templates) > 0)
							<option value="template">{{ __('Template') }}</option>
							@endif
						</select>
						@if(count($templates) > 0)
						<select class="form-control none" name="template" id="templates">
							@foreach($templates as $template)
							<option value="{{ $template->id }}">{{ $template->title }}</option>
							@endforeach
						</select>
						@endif
						<textarea type="text" name="message" class="form-control" id="plain-text" rows="2"
							placeholder="Message" aria-label="Recipient's username"
							aria-describedby="basic-addon2"></textarea>

					</div>
					<div class="input-group-append none sendble-row">
						<div id="mediaFile" class="none">
							<input id="file" type="file" class="form-control" name="file" />
							<small>{{__(' Supported file type:')}}</small> <small class="text-danger">{{
								__('jpg,jpeg,png,webp,pdf,docx,xlsx,csv,txt') }}</small>
						</div>
						<button class="btn mt-auto btn-outline-success ml-auto submit-button" type="submit"><i
								class="fi fi-rs-paper-plane"></i>&nbsp&nbsp {{ __('Sent') }}</button>
					</div>
				</form>
			</div>
			@else
			<div class="col-sm-12">
				<div class="alert bg-gradient-primary text-white alert-dismissible fade show" role="alert">
					<span class="alert-icon"><i class="fi  fi-rs-info text-white"></i></span>
					<span class="alert-text">
						<strong>{{ __('!Opps ') }}</strong>

						{{ __('Chat list access features is not available in your subscription plan') }}

					</span>
				</div>
			</div>
			@endif
		</div>
	</div>
</div>
<input type="hidden" id="uuid" value="{{$device->uuid}}">
<input type="hidden" id="base_url" value="{{ url('/') }}">
@endsection
@if(getUserPlanData('access_chat_list') == true)
@push('js')
<script type="text/javascript" src="{{ asset('assets/js/pages/chat/list.js') }}"></script>
@endpush
@endif