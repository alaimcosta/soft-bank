<h1>Sistema de Empréstimos - SoftBank</h1>

Este projeto foi desenvolvido com o objetivo de consolidar conhecimentos em **Java, Angular e PostgreSQL**.  
Trata-se de um **sistema de gestão de empréstimos bancários**, que permite o cadastro e gerenciamento de clientes, bem como o controle das operações de solicitação e acompanhamento de empréstimos.  

A aplicação oferece funcionalidades de **CRUD (Criar, Ler, Atualizar e Deletar)** para as entidades **Cliente** e **Empréstimo**, além de realizar consultas em **APIs públicas do Banco Central do Brasil** para enriquecer os dados e cálculos financeiros.  

No backend, o sistema foi construído utilizando o **Spring Boot** e o **Spring Data JPA**, fornecendo uma arquitetura robusta, escalável e de fácil manutenção, ideal para aplicações baseadas em **APIs RESTful**.  
No frontend, o **Angular** foi utilizado para entregar uma interface interativa e responsiva, garantindo uma boa experiência do usuário.<br>

## 🏗️ Arquitetura do Projeto
```bash
frontend-bank/   → Aplicação Angular (Interface Web)
api/             → API REST com Spring Boot
postgres/        → Banco de dados PostgreSQL
```

## 🚀 Funcionalidades

- ✅ Cadastro de clientes e empréstimos  
- ✅ Listagem de registros com filtros  
- ✅ Atualização de informações  
- ✅ Remoção de registros  
- ✅ Integração com APIs externas para dados de câmbio  

## 📋 Ferramentas utilizadas

### Back-end
- ☕ **Java JDK 17**
- ⚙️ **Maven**
- **Spring Boot 3.5.4**
- **JPA**
- **Lombook**

### Front-end
- 💻 **Node.js 22(LTS)**
- 🅰️ **Angular CLI 19** 
### Banco de dados
- 🐘 **PostgreSQL**  
### Infra
- **Docker**
- IDE: **VS Code**

## Back-end

### 📬 Endpoints da API
```bash
GET     /cliente         -> Lista todos os clientes
POST    /cliente         -> Cadastra novo cliente
PUT     /cliente         -> Atualiza um cliente
DELETE  /cliente/{id}    -> Remoção lógica de um cliente
```

## Front-end

## 🔧 Configuração do Banco de Dados

Configure o arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/my-bank
spring.datasource.username=admin
spring.datasource.password=admin

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## 🚀 Como executar
### PostgreSQL usando Docker:

```bash
docker run --name api-bank -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=my-bank -p 5432:5432 -d postgres
```

### Maven:

```bash
mvn spring-boot:run
```


## Autor
| [<sub>Alaim JL Costa</sub>](https://github.com/alaimcosta) |
| :---: |

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Você pode usar, copiar, modificar e distribuir este software com ou sem modificações, desde que preserve os termos da licença.

Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.