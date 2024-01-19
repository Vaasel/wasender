@extends('layouts.main.app')
@section('head')
@include('layouts.main.headersection',['buttons'=>[
[
'name'=>'<i class="fa fa-backward"></i>&nbsp'. __('Back To Templates'),
'url'=>url('/user/template'),
'is_button'=>false
],
[
'name'=>'<i class="fa fa-backward"></i>&nbsp'. __('Back To Contacts'),
'url'=>url('/user/contact'),
'is_button'=>false
]
]])
@endsection
@section('content')
<div class="row justify-content-center">
   <div class="col-12">

      <div class="card">
         <div class="card-body">
            <div class="row mb-3">
               <div class="col-12">
                  <div class="float-left">
                     <h4><span class=""><b>Template</b> </span> : <span class="total_records">{{ $template->title
                           }}</span></h4>
                     <h4><span class=""><b>Group</b> </span> : <span class="total_records">{{ $group->name }}</span>
                     </h4>
                  </div>
                  <div class="float-right">
                     <button class="btn  btn-neutral btn-sm  send_now" type="button"><i
                           class="ni ni-send"></i>&nbsp&nbsp{{ __('Start Sending') }}</button>
                     <button style="display:none" class="btn  btn-neutral btn-sm  sending"><i class="ni ni-send"></i>&nbsp&nbsp{{ __('Sending
                        Messages') }}</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="row d-flex justify-content-between flex-wrap">
         <div class="col-sm-4">
            <div class="card card-stats">
               <div class="card-body">
                  <div class="row">
                     <div class="col">
                        <span class="h2 font-weight-bold mb-0 total_records" id="total_records">
                           {{$totalContacts}}</span>
                     </div>
                     <div class="col-auto">
                        <div class="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                           <i class="fi fi-rs-rocket-lunch mt-2"></i>
                        </div>
                     </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                  </p>
                  <h5 class="card-title  text-muted mb-0">{{ __('Total Contacts') }}</h5>


               </div>
            </div>
         </div>
         <div class="col-sm-4">
            <div class="card card-stats">
               <div class="card-body">
                  <div class="row">
                     <div class="col">
                        <span class="h2 font-weight-bold mb-0 total-transfers total_sent">
                           0
                        </span>
                     </div>
                     <div class="col-auto">
                        <div class="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                           <i class="fi fi-rs-rocket-lunch mt-2"></i>
                        </div>
                     </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                  </p>
                  <h5 class="card-title  text-muted mb-0">{{ __('Total Sent') }}</h5>
                  <p></p>
               </div>
            </div>
         </div>
         <div class="col-sm-4">
            <div class="card card-stats">
               <div class="card-body">
                  <div class="row">
                     <div class="col">
                        <span class="h2 font-weight-bold mb-0 completed-transfers total-faild">
                           0
                        </span>
                     </div>
                     <div class="col-auto">
                        <div class="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                           <i class="fi fi-rs-circle-cross mt-2"></i>
                        </div>
                     </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                  </p>
                  <h5 class="card-title  text-muted mb-0">{{ __('Total Faild') }}</h5>
                  <p></p>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<input type="hidden" id="base_url" value="{{ url('/') }}">
<input type="hidden" id="form_link" value="{{ url('user/sent-message-with-template') }}">

@endsection
@push('js')

<script>
   var _template = <?php echo json_encode($template); ?>;
   var _group = <?php echo json_encode($group); ?>;
   var _device = <?php echo json_encode($device); ?>;
</script>
<script src="{{ asset('assets/js/pages/user/dashboard.js') }}"></script>
<script src="{{ asset('assets/js/pages/user/template-bulk.js?V=1.3') }}"></script>
@endpush