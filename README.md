#Projeto

Projeto de **perguntas** e **respostas**. Usuários se cadastram, criam perguntas, e outros usuários respondem. A organização é semelhante a de um fórum, contendo tópicos e subtópicos, e a comunicação é feita por um chat. 

O projeto é feito com base no HTML, CSS, Javascript, logo, é multiplataforma (android, ios, windowsphone etc).

###Tecnologias utilizadas

####**App:**

- Ionic Framework (tem base no angularjs). Site: http://ionicframework.com
- ngCordova (plugins para uso de componentes nativos). Site: http://ngcordova.com
- Plugins: camera. Site: http://ngcordova.com/docs/plugins/camera/

####**Servidor:**

- PHP + MySQL
- PHPMailer. GitHub: https://github.com/PHPMailer/PHPMailer

###Requisitos

- Instalar JDK e configurar o JAVA_HOME
- Instalar o Android Studio
- Instalar a API 23 do Android
- Instalar o Node.js
- Instalar o Cordova e o Ionic: http://ionicframework.com/getting-started/

###Configurar Servidor

Editar o arquivo servidor -> config.php, e colocar as informações do servidor.

###Configurar o App

- Editar o arquivo app -> www -> js -> controller.js, e alterar a variável 'urlRoot' para apontar pro seu servidor.
- Usando o prompt de comando, ir até a pasta do projeto, e adicionar a plataforma android ou ios.
- Já na pasta do projeto, adicionar o plugin camera: http://ngcordova.com/docs/plugins/camera/

###Rodando o App

- Usando o prompt de comando, ir até a pasta do projeto, e rodar o 'ionic serve'. Vantagem: console para ver os erros.
- Ou rodar o 'ionic upload', baixar o app ionic view no seu celular e adicionar o id mostrado no prompt.
- Ou rodar o 'ionic run android' ou 'ionic run ios' para rodar no próprio dispositivo conectado ou emulador.

###Build

Para dar build, rode 'ionic build android', gerando um apk(no caso do android).
