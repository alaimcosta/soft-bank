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

### 🌱 Spring Boot

Framework baseado no **Spring Framework** que tem como objetivo **simplificar a criação de aplicações Java**.  
Elimina grande parte da configuração manual necessária em projetos Java, fornecendo um conjunto de convenções e ferramentas que permitem iniciar rapidamente uma aplicação **pronta para produção**.

Com o Spring Boot, é possível criar aplicações **standalone** (autoexecutáveis), utilizando um **servidor embutido** (como Tomcat ou Jetty), além de contar com integração facilitada com diversos módulos como **Spring Data JPA**, **Spring Security**, **Spring Web**, entre outros.

### 🚀 Principais Recursos
- **Configuração automática**: reduz a necessidade de XML ou configurações extensas.
- **Servidor embutido**: não é necessário instalar ou configurar servidores externos.
- **Dependências simplificadas**: uso do *Spring Boot Starter*, pacotes que agrupam bibliotecas comuns.
- **Monitoramento**: suporte ao **Spring Boot Actuator** para métricas e saúde da aplicação.

### Exemplo de Aplicação
```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BankApplication {
    public static void main(String[] args) {
        SpringApplication.run(BankApplication.class, args);
    }
}
```

### 📦 DTOs com `record`

Neste projeto, os **DTOs (Data Transfer Objects)** foram implementados utilizando a feature `record` do Java.  

Um `record` é uma forma concisa e imutável de declarar classes que têm como objetivo principal **transportar dados**. Diferente de uma classe comum, ele já gera automaticamente métodos como `equals()`, `hashCode()`, `toString()` e os próprios getters, reduzindo a verbosidade do código.  

#### Exemplo:
```java
public record DadosDetalhamentoEmprestimo(
    Long id,
    BigDecimal valor,
    LocalDate dataSolicitacao,
    Long clienteId
) {}
```
### 🛠️ Lombok
**Lombok** é uma biblioteca Java que ajuda a reduzir a verbosidade do código, eliminando a necessidade de escrever manualmente métodos repetitivos como **getters, setters, equals, hashCode, toString**, além de construtores.  

Funciona por meio de **anotações** que, durante a compilação, geram automaticamente o código necessário, tornando-o desenvolvimento mais produtivo e o código mais **limpo e legível**.  

### Exemplo:
```java
import lombok.Data;

@Data
public class Cliente {
    private Long id;
    private String nome;
}

```
### 🗄️ JPA (Java Persistence API)

A **JPA** (Java Persistence API) é uma especificação do Java para o **mapeamento objeto-relacional (ORM)**.  
Permitindo que as classes Java sejam mapeadas para tabelas do banco de dados, facilitando a manipulação e persistência de dados sem a necessidade de escrever diretamente **SQL**.

Na JPA é utilizado o conceito de **entidades** (classes anotadas) que representam as tabelas e suas relações. O framework mais utilizado para implementação da JPA é o **Hibernate**, amplamente integrado em aplicações **Spring Boot**.

### Principais Anotações:
- `@Entity` → Define a classe como uma entidade JPA (tabela do banco).
- `@Table` → Especifica o nome da tabela no banco de dados.
- `@Id` → Define a chave primária da entidade.
- `@GeneratedValue` → Configura a estratégia de geração do ID (auto incremento).
- `@Column` → Configura propriedades da coluna (nome, tamanho, nullable, etc).
- `@ManyToOne`, `@OneToMany`, `@OneToOne`, `@ManyToMany` → Definem os relacionamentos entre entidades.

### Exemplo:
```java
import jakarta.persistence.*;

@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
}
```

### 📬 Endpoints da API
```bash
GET     /cliente         -> Lista todos os clientes
POST    /cliente         -> Cadastra novo cliente
PUT     /cliente         -> Atualiza um cliente
DELETE  /cliente/{id}    -> Remoção lógica de um cliente

GET     /emprestimo         -> Lista todos os emprestimos
POST    /emprestimo         -> Cadastra novo emprestimo
PUT     /emprestimo         -> Atualiza um emprestimo
DELETE  /emprestimo/{id}    -> Remoção lógica de um emprestimo
```

## Front-end

### 🅰️ Angular 19

O **Angular** é um framework front-end mantido pelo **Google**, utilizado para o desenvolvimento de aplicações **web modernas, escaláveis e de alta performance**.  
Segue o padrão **SPA (Single Page Application)** e utiliza **TypeScript** como linguagem principal, oferecendo tipagem forte, modularização e maior segurança no código.

### Estrutura de Componentes
- **app.component.ts** Raiz do projeto
- **cliente/cliente.component.ts** CRUD de clientes
- **emprestimo/emprestimo.component.ts** Solicitação de empréstimos

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