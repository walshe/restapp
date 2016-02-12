
#Restapp
Restapp is a simple single page application (SPA) which communicates with a RESTful backend.

Spring Boot has been used to develop the restful backend. 
AngularJs has been used to develop the single page application. (The spring boot application is also used to serve up the angular app.)



## Backend
The backend was developed using Spring Boot which allows us to get basic web application, rest infrastructure and object relational mapping amongst others set up pretty quickly with minimal effort or code.

Some technologies of note auto configured by Spring boot:

- Hsqldb database : for simplicity , an in memory database is used to store Company and Owner information. Any data created/updated therefore will not survive a server restart. Spring Boot auto-configures an embedded HSQL database. You don’t need to provide any connection URLs, simply include a build dependency to the embedded database that you want to use in the pom.xml maven build file.

- Spring Data JPA : part of the larger Spring Data family, makes it easy to easily implement a data access layer which allows our applications perform various database operations and also allows us to deal with the data in an object-relational manner.

- Spring Data Rest : builds on top of Spring Data repositories, analyzes the application's domain model and exposes hypermedia-driven HTTP resources for aggregates contained in the model.

The application uses [HAL](http://stateless.co/hal_specification.html) as the primary representation format.

### REST services & cURL commands
examples below assume a server at localhost:8080
#### Get all companies  
```
curl localhost:8080/api/companies
```

This will return:

```javascript
{
  "_embedded" : {
    "companies" : [ {
      "name" : "Microsoft 0",
      "address" : "One Microsoft Way",
      "city" : "Redmond",
      "country" : "USA",
      "email" : "info@microsoft.com",
      "phoneNumber" : "(425) 703-62140",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/companies/1"
        },
        "company" : {
          "href" : "http://localhost:8080/api/companies/1"
        },
        "owners" : {
          "href" : "http://localhost:8080/api/companies/1/owners"
        }
      }
    },.....
```
The service also offers paging and sorting although this is not used in the front end as yet e.g. http://localhost:8080/api/companies?page=0&size=10&sort=name,desc



#### Get a particular company

```
curl localhost:8080/api/companies/1
```
This will return:

```javascript
{
  "name" : "Microsoft 0",
  "address" : "One Microsoft Way",
  "city" : "Redmond",
  "country" : "USA",
  "email" : "info@microsoft.com",
  "phoneNumber" : "(425) 703-62140",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/companies/1"
    },
    "company" : {
      "href" : "http://localhost:8080/api/companies/1"
    },
    "owners" : {
      "href" : "http://localhost:8080/api/companies/1/owners"
    }
  }
```

#### Create a company
```

curl -i -X POST -H "Content-Type:application/json" -d '{  "name" : "Apple",  "address" : "PA", "city":"SF", "country":"USA", "email":"info@apple.com", "phoneNumber":"1234567" }' http://localhost:8080/api/companies
HT

```
This will return:

```javascript
HTTP/1.1 201 Created
Server: Apache-Coyote/1.1
Location: http://localhost:8080/api/companies/5
Content-Type: application/hal+json;charset=UTF-8
Transfer-Encoding: chunked
Date: Fri, 12 Feb 2016 17:40:46 GMT

{
  "name" : "Apple",
  "address" : "PA",
  "city" : "SF",
  "country" : "USA",
  "email" : "info@apple.com",
  "phoneNumber" : "1234567",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/companies/5"
    },
    "company" : {
      "href" : "http://localhost:8080/api/companies/5"
    },
    "owners" : {
      "href" : "http://localhost:8080/api/companies/5/owners"
    }
  }
}
```

It can also return validation messages e.g.

```
url -i -X POST -H "Content-Type:application/json" -d '{ "email":"info@apple.com", "phoneNumber":"1234567" }' http://localhost:8080/api/companies
```

```
This will return:

```javascript
HTTP/1.1 400 Bad Request
Server: Apache-Coyote/1.1
Content-Type: application/hal+json;charset=UTF-8
Transfer-Encoding: chunked
Date: Fri, 12 Feb 2016 17:42:25 GMT
Connection: close

{
  "errors": [
    {
      "entity": "Company",
      "message": "may not be null",
      "invalidValue": "null",
      "property": "country"
    },
    {
      "entity": "Company",
      "message": "may not be null",
      "invalidValue": "null",
      "property": "name"
    },
    {
      "entity": "Company",
      "message": "may not be null",
      "invalidValue": "null",
      "property": "address"
    },
    {
      "entity": "Company",
      "message": "may not be null",
      "invalidValue": "null",
      "property": "city"
    }
  ]
}
```


#### Update a company
```
curl -X PUT -H "Content-Type:application/json" -d '{  "name" : "Apple",  "address" : "PA", "city":"SF", "country":"USA", "email":"info@apple.com", "phoneNumber":"1234567"}' http://localhost:8080/api/companies/1

```
This will return:

```javascript
{
  "name" : "Apple",
  "address" : "PA",
  "city" : "SF",
  "country" : "USA",
  "email" : "info@apple.com",
  "phoneNumber" : "1234567",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/companies/1"
    },
    "company" : {
      "href" : "http://localhost:8080/api/companies/1"
    },
    "owners" : {
      "href" : "http://localhost:8080/api/companies/1/owners"
    }
  }
```

its also possible to update a subset of fields with PATCH
```
curl -X PATCH -H "Content-Type:application/json" -d '{ "email":"info2@apple.com"}' http://localhost:8080/api/companies/1
```
This will return:
```javascript
{
  "name" : "Apple",
  "address" : "PA",
  "city" : "SF",
  "country" : "USA",
  "email" : "info2@apple.com",
  "phoneNumber" : "1234567",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/companies/1"
    },
    "company" : {
      "href" : "http://localhost:8080/api/companies/1"
    },
    "owners" : {
      "href" : "http://localhost:8080/api/companies/1/owners"
    }
  }
}
```



#### Delete a company
```
curl -X DELETE http://localhost:8080/api/companies/1
```
This will return:

```javascript
204: No Content
```
#### Get the owners of a company
```
curl http://localhost:8080/api/companies/1/owners
```
This will return:

```javascript
{
  "_embedded" : {
    "owners" : [ {
      "firstName" : "Bill0",
      "lastName" : "Gates0",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/owners/1"
        },
        "owner" : {
          "href" : "http://localhost:8080/api/owners/1"
        },
        "company" : {
          "href" : "http://localhost:8080/api/owners/1/company"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/companies/1/owners"
    }
  }
}
```
#### Add a new owner to a company
```
curl-i -X POST -H "Content-Type:application/json" -d '{ "firstName":"Steve", "lastName":"Ballmer", "company":"http://localhost:8080/api/companies/1" }' http://localhost:8080/api/owners
(notice a uri is used for the company - i.e. the foreign key)

```
This will return:

```javascript
HTTP/1.1 201 Created
Server: Apache-Coyote/1.1
Location: http://localhost:8080/api/owners/4
Content-Type: application/hal+json;charset=UTF-8
Transfer-Encoding: chunked
Date: Fri, 12 Feb 2016 18:00:18 GMT

{
  "firstName" : "Steve",
  "lastName" : "Ballmer",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/owners/4"
    },
    "owner" : {
      "href" : "http://localhost:8080/api/owners/4"
    },
    "company" : {
      "href" : "http://localhost:8080/api/owners/4/company"
    }
  }
```
#### Update an owner of a company
```
curl -X PUT -H "Content-Type:application/json" -d '{  "firstName" : "Stevie",  "lastName" : "B"}' http://localhost:8080/api/owners/4
```
This will return:

```javascript
{
  "firstName" : "Stevie",
  "lastName" : "B",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/owners/4"
    },
    "owner" : {
      "href" : "http://localhost:8080/api/owners/4"
    },
    "company" : {
      "href" : "http://localhost:8080/api/owners/4/company"
    }
  }
}
```

or update a subset of the owner fields with a PATCH
```
curl -X PATCH -H "Content-Type:application/json" -d '{  "firstName" : "Steo"}' http://localhost:8080/api/owners/4
```
this will return
```javascript
{
  "firstName" : "Steo",
  "lastName" : "B",
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/owners/4"
    },
    "owner" : {
      "href" : "http://localhost:8080/api/owners/4"
    },
    "company" : {
      "href" : "http://localhost:8080/api/owners/4/company"
    }
  }
}
```

#### Delete an Owner
```
curl -X DELETE http://localhost:8080/api/owners/1
```
This will return:

```javascript
204: No Content
```

#### ALPS
ALPS is a data format for defining simple descriptions of application-level semantics, similar in complexity to HTML micro-formats. It also supports adding its metadata to existing media types. As of version 2.2 M1, Spring Data REST exposes JSON based ALPS resources that can help us navigate its resources

```
http://localhost:8080/api/
```
returns
```javascript
{
  "_links" : {
    "owners" : {
      "href" : "http://localhost:8080/api/owners"
    },
    "companies" : {
      "href" : "http://localhost:8080/api/companies{?page,size,sort}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://localhost:8080/api/profile"
    }
  }
```
At the root document are  links: owners, companies and profile. The client might not know what owners or companies mean, but the content contained inside profile is well defined. It basically points to a resource that describes the semantics of the resources on top of what the actual media type (HAL in this case) defines

e.g.
```
http://localhost:8080/api/companies
```

returns
```javascript
{
  "_embedded" : {
    "companies" : [ {
      "name" : "Microsoft 0",
      "address" : "One Microsoft Way",
      "city" : "Redmond",
      "country" : "USA",
      "email" : "info@microsoft.com",
      "phoneNumber" : "(425) 703-62140",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/companies/1"
        },
        "company" : {
          "href" : "http://localhost:8080/api/companies/1"
        },
        "owners" : {
          "href" : "http://localhost:8080/api/companies/1/owners"
        }
      }
    }, {
      "name" : "Microsoft 1",
      "address" : "One Microsoft Way",
      "city" : "Redmond",
      "country" : "USA",
      "email" : "info@microsoft.com",
      "phoneNumber" : "(425) 703-62141",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/companies/2"
        },
        "company" : {
          "href" : "http://localhost:8080/api/companies/2"
        },
        "owners" : {
          "href" : "http://localhost:8080/api/companies/2/owners"
        }
      }
    }, {
      "name" : "Microsoft 2",
      "address" : "One Microsoft Way",
      "city" : "Redmond",
      "country" : "USA",
      "email" : "info@microsoft.com",
      "phoneNumber" : "(425) 703-62142",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/companies/3"
        },
        "company" : {
          "href" : "http://localhost:8080/api/companies/3"
        },
        "owners" : {
          "href" : "http://localhost:8080/api/companies/3/owners"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/api/companies"
    },
    "profile" : {
      "href" : "http://localhost:8080/api/profile/companies"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 3,
    "totalPages" : 1,
    "number" : 0
  }
}
```

## Frontend

When the main web application is accessed at "/", the default static/index.html page will be loaded. This page bootstraps the angularjs single page application, pulling in all the js and html files that it requires.

App uses angularjs 1.3.0-rc.2

The front end also uses Twitter Bootstrap - "he most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web"









 