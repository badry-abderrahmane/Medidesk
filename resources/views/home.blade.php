<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <meta name="role" content="{{ Auth::user()->roles->first()->name }}">
      <!-- Tell the browser to be responsive to screen width -->
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Help Desk">
      <meta name="author" content="Badry Abderrahmane">
      <!-- Favicon icon -->
      <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/favicon.png">
      <title>HelpDesk v2.0.1</title>
      <link rel="stylesheet" type="text/css" href="{{ asset('css/icon.min.css') }}">
      <link rel="stylesheet" type="text/css" href="{{ asset('css/semantic.min.css') }}">
      <link rel="stylesheet" type="text/css" href="{{ asset('css/dataTables.semanticui.min.css') }}">
      <link rel="stylesheet" type="text/css" href="{{ asset('css/buttons.semanticui.min.css') }}">
      <link rel="stylesheet" type="text/css" href="{{ asset('css/jquery.toast.css') }}">
      <link rel="stylesheet" href="/css/app.css">
      <style>
        .Site {
          display: flex;
          min-height: 90vh;
          flex-direction: column;
        }
        
        .Site-content {
          flex: 1;
        }
      </style>
  </head>

  <body class="Site">
    <main class="Site-content" id="app">
      <full-app></full-app>
    </main>
    <footer>
      <div class="ui black inverted vertical footer segment" >
        <div class="ui  aligned container">
          <div class="ui stackable inverted grid">
              <div class="seven wide left floated column">
                  <h5 class="ui inverted grey header">STG DESK V2.1.1</h5>
                </div>
              <div class="three wide column">
                  <a class="item" href="/#/apropos"><h4 class="ui inverted grey header"><i class="info circle icon"></i>A Propos</h4></a>
              </div>
              <div class="three wide column">
                  <a class="item" href="/#/support"><h4 class="ui inverted grey header"><i class="life ring outline icon"></i>Support</h4></a>
              </div>
              
            </div>
        </div>
      </div>
    </footer>
    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/jquery.datatables.min.js') }}"></script>
    <script src="{{ asset('js/semantic.min.js') }}"></script>
    <script src="{{ asset('js/dataTables.semanticui.min.js') }}"></script>
    <script src="{{ asset('js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('js/buttons.semanticui.min.js') }}"></script>
    <script src="{{ asset('js/jszip.min.js') }}"></script>
    <script src="{{ asset('js/pdfmake.min.js') }}"></script>
    <script src="{{ asset('js/vfs_fonts.js') }}"></script>
    <script src="{{ asset('js/buttons.html5.min.js') }}"></script>
    <script src="{{ asset('js/buttons.print.min.js') }}"></script>
    <script src="{{ asset('js/buttons.colVis.min.js') }}"></script>
    <script src="{{ asset('js/jquery.toast.js') }}"></script>
    <script src="/js/app.js" charset="utf-8"></script>
    
  </body>

  
</html>
