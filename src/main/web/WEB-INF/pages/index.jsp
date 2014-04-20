<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">

    <%--  Allows us to choose what version of Internet Explorer the page should be rendered as --%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <%-- For mobile browsers --%>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="shortcut icon" href="http://getbootstrap.com/assets/ico/favicon.ico">

    <title>Sprinkle</title>

    <!-- Bootstrap core CSS -->
    <link href="libs/css/bootstrap.min.css" rel="stylesheet">

    <!-- Mapbox core css -->
    <link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' rel='stylesheet'/>

    <!-- Custom styles for this template -->
    <link href="css/stylesheet.css" rel="stylesheet">

    <!-- Mapbox core JavaScript
    ================================================== -->
    <script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js'></script>


    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Sprinkle</a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
        <!--/.nav-collapse -->
    </div>
</div>

<%--<div class="container starter-template">--%>

<div id='map'></div>
<script>
    var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
            .setView([40, -74.50], 9);
    map.zoomControl.setPosition('bottomleft');
</script>

<%--</div>&lt;!&ndash; /.container &ndash;&gt;--%>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="libs/js/bootstrap.min.js"></script>
</body>
</html>