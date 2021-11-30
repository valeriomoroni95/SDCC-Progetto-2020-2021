# SDCC-Progetto-2020-2021
 Repository to hold files of the project
 
# Configurazione
Essendo scaduto l'account AWS Educate, l'infrastruttura utilizzata per lo sviluppo del progetto risulta ora inesistente. Non lo è (almeno per il momento), l'applicazione con il relativo endpoint, che si riporta di seguito: http://musifyhostingbucket.s3-website-us-east-1.amazonaws.com

I dettagli per ricreare l'infrastruttura esattamente come utilizzata durante lo sviluppo sono stati descritti nella relazione: per quanto riguarda S3 e DynamoDB, le specifiche possono essere trovate nella sezione "Architettura" (non essendo stato necessario effettuare alcuna configurazione aggiuntiva rispetto a quelle citate), mentre per AWS Lambda ed API Gateway le specifiche di configurazione (step by step) sono state riportate in "Implementazione".

Un breve tutorial di utilizzo dell'app è stato allegato alla repository, per evidenziarne le funzionalità principali. I flussi d'esecuzione di ogni singola funzionalità sono stati, invece, riportati nella relazione sempre sotto la voce "Implementazione".

I codici sorgente possono essere trovati nella cartella "LambdaFunctions", per quanto riguarda le funzioni Lambda create direttamente dalla console AWS e in "Front-End" per quanto riguarda la parte relativa alla user experience. I file Javascript, che sono i più importanti per la logica dell'applicazione, possono essere trovati in "assets/js/funcCaller" e "assets/js/playerLogic.js".
