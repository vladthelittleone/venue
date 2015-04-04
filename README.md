# venue

Map-service using [MapBox](https://www.mapbox.com/) and [Angular](https://angularjs.org/) framework.

![](https://pp.vk.me/c621416/v621416334/1a15e/Gx4oHF6qiog.jpg)
In back-end i use:

* [Spring Security](https://github.com/vladthelittleone/venue/tree/master/venue-web/src/main/webapp/WEB-INF/spring/security) for authentification
* [Spring](https://github.com/vladthelittleone/venue/tree/master/venue-web/src/main/webapp/WEB-INF/spring) as IoC container 
* [Spring MVC](https://github.com/vladthelittleone/venue/tree/master/venue-web/src/main/java/com/venue/web/controller)
* [Maven](https://github.com/vladthelittleone/venue/blob/master/venue-web/pom.xml) as management and comprehension tool
* etc.

## Tomcat SSL configuration:

Execute:

```
cd %JAVA_HOME%/bin
```

Then:

```
keytool -genkey -alias tomcat -keyalg RSA 
```
Tool will ask some questions and then create file **/Users/[username]/.keystore**

Open **%TOMCAT_HOME%/conf/server.xml**

Find chunk:

```
<!--
<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
maxThreads="150" scheme="https" secure="true"
clientAuth="false" sslProtocol="TLS" />
-->
```

Uncomment it and add path to keystore and keystore password. It should look as follows:

<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS"
               keystoreFile="keystoreFile" 
               keystorePass="keystorePass"/>
               
* keystorePass - password you specified when creating .keystore.
* keystoreFile - **/Users/[username]/.keystore** in mac/linux by default.
