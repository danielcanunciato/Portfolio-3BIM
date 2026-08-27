**1) Explique com suas palavras por que o CORS é importante em uma API.**

Por conta de permitir sites de origens diferentes fazem uso da sua API, contornando a política de segurança do navegador que bloqueia requisições entre domínios distintos.

---

**2) Liste os três cabeçalhos de CORS estudados e diga a função de cada um.**

> Access-Control-Allow-Origin: Libera quais domínios podem acessar a API

> Access-Control-Allow-Methods: Define quais métodos HTTP são permitidos.

> Access-Control-Allow-Headers: Especifica quais cabeçalhos podem ser enviados na requisição.

---

**3) Explique como uma API pode permitir uma aplicação parceira e impedir uma origem não autorizada**

A API verifica a origem da requisição e só retorna o cabeçalho "Allow-Origin" se o domínio estiver em uma lista autorizada. Uma origem não listada fica sem resposta CORS, sendo bloqueado pelo navegador.

---

**4) Explique um problema que pode acontecer se o CORS for configurado de forma incorreta.**

Liberar "*" com credenciais expõe a API a ataques de qualquer site; restringir demais quebra o funcionamento do front-end parceiro com erros de bloqueio.

---

**5) Explique a ideia do OAuth 2.0 no cenário bancário e cite os fluxos apresentados no material.**

Permite que aplicações acessem dados financeiros do usuário sem compartilhar a senha, usando tokens com escopo limitado, alguns fluxos comuns são Authoriu7jezation Code, através do servidor, e Client Credentials que é para comunicação entre sistemas.

---

**6) Explique o que é armazenado no payload de um JWT e qual a função da signature.**

O payload armazena dados como ID do usuário, expiração e permissões (claims). A signaure garante integridade e autenticidade, impedindo alterações não detectadas.

---

**7) Descreva um fluxo simples para proteger uma operação financeira usando JWT.**

Usuário Loga, em seguida o servidor gera o JWT assinado, o cliente envia o token no header Authorization ao fazer transferência, por fim o servidor valida a assinatura e permissões antes de executar

---

**8) Cite medidas adicionais de segurança indicadas no material, como HTTPS e políticas de CORS.**

Usar o HTTPS (a versão com criptografia do HTTP) para criptografar toda a comunicação e CORS restrito com origens confiáveis para evitar acessos indevidos pelo navegador.

---

**9) Qual é a principal função de uma ferramenta de monitoramento?**

Para acompanhar métricas de desempenho, disponibilidade e saúde da API em tempo real, permitindo detectar falhas antes que afetem os usuários.

---

**10) Qual ferramenta apresentada no material é indicada para análise de logs em tempo real?**

O ELK Stack (Elasticsearch, Logstash, Kibana) coleta, processa e visualiza logs em tempo real, enquanto o Splunk também é citado para análise de grandes volumes de dados de máquina.

---

**11) Qual a diferença entre log de acesso e log de erro?**

O log de acesso registra todas as requisições recebidas (quem, quando, qual endpoint e status HTTP). Log de erro captura exceções, falhas internas e problemas na execução da API.

---

**12) Como os logs podem ajudar a identificar tentativas de ataque?**

Padrões suspeitos como múltiplas requisições com falha de autenticação, SQL Injection em parâmetros ou acessos a endpoints sensíveis em curto intervalo ficam evidentes nos logs, permitindo alertas e bloqueios.

---

**13) Em um período de Black Friday, qual seria a primeira informação que você procuraria no monitoramento e por quê?**

A taxa de erro HTTP (como 500 e 429) e o tempo médio de resposta, porque alto tráfego pode sobrecarregar a API, causando lentidão ou quedas que prejudicam vendas e experiência do usuário.

---

**14) O que forma uma origem no CORS?**

Uma origem é composta pelo protocolo (ex: HTTP/HTTPS), dominio (ex: api.example.com) e porta, como "443" ou "3000"). Mudando qualquer uma dessas propriedades, a origem é estrangeira.

---

**15) Qual cabeçalho define as origens permitidas?**

O cabeçalho Access-Control-Allow-Origin define quais origens podem acessar os recursos da API.

---

**16) Qual é a diferença entre autenticação e autorização?**

A Autenticação verifica as credenciais. A Autorização define o que ele pode fazer.

---

**17) Quais são as três partes de um JWT?**

Header (algoritmo e tipo), Payload (dados/claims) e Signature (assinatura para validar a integridade). As três são codificadas em Base64 e separadas por pontos.

---

**18) Qual é a diferença entre monitoramento e análise de logs?**

O Monitoramento acompanha métricas em tempo real (CPU, taxa de erro, resposta) para alertas imediatos. A Análise de logs examina registros históricos para investigar causas, padrões e tendências de falhas ou ataques.
