# Aprende Cómo Aplicar los Principios SOLID en React JS

![Aprende Cómo Aplicar los Principios SOLID en React JS](https://developero.io/_next/image?url=%2Fstatic%2Fimages%2Fprincipios-solid-react-js%2FPrincipios-SOLID-en-React-JS.png&w=3840&q=75)

En este mega tutorial vas a aprender a cómo aplicar correctamente los React Solid Principles o Principios SOLID en React JS paso a paso y desde cero.

**Conocerlos fue un parte aguas de un antes y después en mi carrera como desarrollador de software. Gracias a que los aprendí, pude pasar de Junior a Mid en su momento.**

Si sigues estos principios puedes crear un código más fácil de mantener y de leer independientemente de la tecnología que estés usando.

Table of Contents

- [¿Qué significa principios SOLID?](https://developero.io/blog/react-solid-example#qué-significa-principios-solid)
- [Cómo aplicar Principios SOLID en React JS](https://developero.io/blog/react-solid-example#cómo-aplicar-principios-solid-en-react-js)
- [Open Close Principle](https://developero.io/blog/react-solid-example#open-close-principle)
- [Single Responsibility Principle](https://developero.io/blog/react-solid-example#single-responsibility-principle)
- [Liskov Substitution Principle](https://developero.io/blog/react-solid-example#liskov-substitution-principle)
- [Interface Segregation Principle](https://developero.io/blog/react-solid-example#interface-segregation-principle)
- [Dependency Inversion Principle](https://developero.io/blog/react-solid-example#dependency-inversion-principle)
- [Curso GRATIS Patrones de Diseño en React JS](https://developero.io/blog/react-solid-example#curso-gratis-patrones-de-diseño-en-react-js)

Ya sea que estés estudiando simplemente para mejorar o [prepararte para entrevistas de React JS nivel Senior](https://developero.io/blog/react-js-interview-questions), esta guía te va a enseñar todo lo que necesitas, desde nivel conceptual a ejemplos concretos con código.

### ¿Quieres dominar los Patrones de Diseño en React.js?

En mi ebook "Patrones avanzados en React.js", encontrarás más información sobre los patrones explicados en este post y contenido de alta calidad que te ayudará a llevar tus habilidades al siguiente nivel.

[Descargar ebook gratis](https://developero.ipzmarketing.com/f/XttdO4jxMu4)

## ¿Qué significa principios SOLID?

Si bien son el resultado del trabajo de diferentes autores, fueron llamados de ese modo por Robert C. Martin, conocido como el tío Bob y autor de diversos libros como Clean Code y Clean Architecture (de lectura recomendada, te dejo links los libros al final del post).

Son cinco principios:

- **S**ingle Responsibility Principle.
- **O**pen-Closed Principle.
- **L**iskov Substitution Principle.
- **I**nterface Segregation Principle.
- **D**ependency Inversion Principle.

Que si leemos las siglas de cada uno, se forman la palabra **SOLID**.

Son populares porque son el fundamento de los patrones de diseño en la programación orientada a objetos, como los explicados en [el clásico libro de Design Patterns](https://amzn.to/3dyDNII) de "la banda de los cuatro" (gang of four) - Gamma Erich, Helm Richard, Johnson Ralph y Vlissides John.

Si bien estos principios han sido asociados y ejemplificados bajo el paradigma de la programación orientada a objetos (OOP por sus siglas en inglés), no significa que estén casados con este paradigma.

**¿Puedes aplicar los patrones de diseño en React JS?**

La mayoría de los patrones tradicionales (patrones creacionales, estructurales y de comportamiento) no son aplicables en React JS debido a la diferencia de paradigmas, pero no te preocupes, React JS **cuenta con sus propios patrones que son posibles usando las caracerísticas de React.**

En este post vas a encontrar algunos de ellos.

## Cómo aplicar Principios SOLID en React JS

Para aplicar los principios SOlID en React o React Solid necesitamos aprovechar las características que hacen único a esta biblioteca de UI como veremos a continuación.

Vamos a comenzar primero aprendiendo el principio Open - Close, o princpio abierto - cerrado en español. Pienso que es mejor comenzar con él porque es el que más vas a aplicar en tu día a día con React.

## Open Close Principle

![Solid in react js](https://developero.io/static/images/principios-solid-react-js/solid in react.png)

Open Close principle - React Solid.

Este principio fue hecho por Bertrand Meyer en 1980 y se enuncia como:

> Una entidad de software debe estar abierta para su extensión, pero cerrada para su modificación.

En mi experiencia, este principio describe lo que significa que un componente sea realmente reutilizable y es un común denominador en todos los patrones avanzados en React JS.

En el contexto de React, aplicar este patrón se traduce en crear componentes cuyo comportamiento y estructura de UI puedan ser extendidos o modificados sin necesidad de actualizar el código fuente del componente.

Tan solo imagina una app hecha en React en la que cada vez que necesitemos agregar una nueva funcionalidad, necesitemos modificar gran parte de los componentes existentes.

Eso sería un síntoma de deuda técnica que incrementa los costos por mantener el software así como impactar en la experiencia de desarrollo por parte del equipo, lo cual casi nunca es tomado en cuenta pero que es crucial para mantener a las personas motivadas (en mi experiencia personal).

Por lo tanto, si no seguimos las buenas prácticas de desarrollo podemos terminar creando un monstruo de componentes difíciles de mantener y cerrados al cambio, incrementando la deuda técnica y complejidad accidental.

En el mundo de React, este principio puede ser violado en los siguientes casos:

- Cuando necesitamos modificar el formato o apariencia de un componente y tenemos que modificarlo directamente o duplicarlo en uno nuevo (ese componente debería ser extensible tanto en estilos como en estructura).
- Cuando la lógica a implementar en un componente va a variar de un escenario a otro y también la duplicamos (esa lógica debería ser abstraída y proveída según se necesite).

Esto aplica tanto en componentes que solo representan parte de la UI (como un simple button), como componentes que manejan lógica de llamadas a apis y suscripciones a eventos u otras apis.

Por ejemplo, un componente Button puede lucir como sigue:

```
const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>
```

Nota que pasamos por props lo que queremos que haga cuando el usuario haga click en él y su texto a mostrar. Esto es muy común de ver en los componentes simples como un botón.

No tiene sentido crear diferentes componentes Button para que al hacer click hagan cosas diferentes, estaríamos desaprovechando y violando el fundamento principal de los componentes.

Mejor pasamos por un prop lo que queremos que haga cuando hagamos click en él.

Para componentes que manejan lógica, una manera de dejarlos abiertos a su extensión es por medio de inyección de dependencias usando los props, algo muy común cuando usamos el patrón de [High Order Components](https://developero.io/blog/react-js-design-patterns/hoc), pero también podemos aplicarlo con los [Custom Hooks](https://developero.io/blog/react-js-design-patterns/custom-hook), el patrón [Props Getters](https://developero.io/blog/react-js-design-patterns/props-getters) e incluso con usando la funcionalidad de **React Context**.

Para ejemplificar este principio en código, digamos que queremos agregar lógica a nuestros componentes en la que haya un handler para mostrar un alert, independientemente del componente donde lo queramos usar.

Una manera de hacerlo sería agregar una función como la siguiente en cada uno de los componentes que queramos que muestre el alert:

```
const handleCall = () => alert('success!')
```

¿Te imaginas qué pasaría si queremos modificar esa función y la hemos copiado y pegado en 50 componentes? Tendríamos que ir de uno en uno modificando, y lo mismo cada vez que cambie en el futuro.

Una manera de resolverlo puede ser con un [High Order Component (HOC)](https://developero.io/blog/react-js-design-patterns/hoc) que inyecte por props la lógica deseada, en este caso, el handleCall.

```
const WithCall = (Component) => {
  // función que queremos inyectar
  const handleCall = () => alert('success!')
  // aquí la inyectamos
  const Wrapper = (props) => <Component {...props} call={handleCall} />
  return Wrapper
}
```

La manera de usar nuestro HOC en un componente sería:

```
const MyComponent = ({ call }) => {
  return <button onClick={call}>Click me!</button>
}
const MyComponentWithCall = WithCall(MyComponent)
```

Lo más importante a tener en mente cuando creamos nuestras aplicaciones en React (y en cualquier otra tecnología) es mantener el sistema lo más fácil de extender posible sin impactar en grandes cambios.

Esto es posible creando componentes abiertos al cambio como hemos visto anteriormente.

Otro ejemplo de cómo aplicar este principio es pasar de crear formularios controlados en React JS particulares, a abstraer y [crear una biblioteca para el manejo de formularios que sea instalable e independiente](https://developero.io/blog/como-manejar-formularios-en-react-desde-cero).

Y si quieres ver 3 patrones de React JS donde se aplica este principio, te recomiendo que veas el siguiente vídeo del canal de YouTube:

## Single Responsibility Principle

Este principio nos dice que:

> Un módulo debe tener una única razón para cambiar.

Es muy común confundirlo con un principio que se aplica a funciones que son muy grandes: “una función debe hacer sólo una cosa y hacerla bien”.

Hay una gran diferencia entre “hacer solo una cosa” y “tener una razón para cambiar”.

Primero vamos a aclarar lo que significa que el "hacer solo una cosa" en componentes funcionales de React.

```
import { useState, useEffect } from 'react'

const NpmListData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [reactPackagesList, reactPackagesList] = useState({ total: 0, results: [] })

  useEffect(() => {
    fetch('https://api.npms.io/v2/search?q=react')
      .then((response) => response.json())
      .then((data) => reactPackagesList({ total: data.total, results: data.results }))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <h1>Bibliotecas de React</h1>
      <p>Total: {reactPackagesList.total}</p>
      {reactPackagesList.resutls.map(() => {
        /* renderizar listado...*/
      })}
    </>
  )
}
```

En este ejemplo tenemos un componene que está consumiendo la api de NPM cuando se monta, tenemos una variable de estado que indica si está cargando o no, otra para guardar la data que retorna la api y finalmente, hacemos el render de la data cuando termine de consumirla.

Esto funciona y está bien, pero si seguimos la regla de "hacer sólo una cosa", vemos que este componente tiene 2 responsabilidades: tiene la lógica de cómo consumir la información y la lógica para mostrarla en la UI.

Ojo, aquí aún no estamos viendo el principio de Single responsability en React, estamos viendo la regla de "hacer sólo una cosa".

Esto confunde incluso a desarrolladores seniors con años de experiencia, pero yo estoy aquí para ayudar a que no te ocurra ;D

Para aplicar la regla de "hacer sólo una cosa y hacerla bien" en React JS, vamos a desacoplar la lógica de llamada a la API y el componente:

```
import { useState, useEffect } from 'react'

const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [reactPackagesList, reactPackagesList] = useState({ total: 0, results: [] })

  useEffect(() => {
    fetch('https://api.npms.io/v2/search?q=react')
      .then((response) => response.json())
      .then((data) => reactPackagesList({ total: data.total, results: data.results }))
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading, reactPackagesList }
}

const NpmListData = () => {
  const { isLoading, reactPackagesList } = useFetchData()

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <h1>Bibliotecas de React</h1>
      <p>Total: {reactPackagesList.total}</p>
      {reactPackagesList.resutls.map(() => {
        /* renderizar listado...*/
      })}
    </>
  )
}
```

Con este refactor ya tenemos desacoplada la llamada a la API, pero Aún NO ESTAMOS APLICANDO SRP (Single Responsibility Principle).

"Vale Juanito, me queda claro que aquí estás aplicando el hacer sólo una cosa y hacerla bien y que esto NO ES el principio SRP, pero entonces ¿Cómo diantres lo aplico en React JS?".

Por eso este principio es de los más confusos, por su nombre.

Repasemos el principio: "Un módulo debe tener una única razón para cambiar".

¿Qué quiere decir “una razón para cambiar” en este contexto? ¿Y cómo se determina o se conoce esa razón?

En resumen, **es el usuario final quien determina las razones para que algo deba cambiar.**

Un ejemplo de esto es si tienes una app para publicar vacantes de trabajo y tienes por lo menos dos roles:

- Los que reclutan y publican las vacantes.
- Los que buscan y aplican a esas vacantes.

Por lo tanto, si tenemos los roles de reclutadores y aplicantes, si los requerimientos de los reclutadores nos hacen modificar partes de código destinados hacia los aplicantes, entonces estamos violando este principio. ¡Voilá!

Para que lo anterior haga sentido, vamos entrando a un ejemplo a nivel muy, muy general.

```
const JobOffer = ({ isRecruiter = true }) => {
  if (isRecruiter) {
    return 'Oferta de trabajo con opciones para el reclutador'
  }
  return 'Oferta de trabajo con opciones para el aplicante'
}
```

Digamos que este componente renderiza la información de la oferta de una vacante pero lo que va a mostrar dependerá del rol del usuario.

Por ejemplo, un reclutador no podrá ver la opción para aplicar a la vacante y un potencial aplicante no podrá ver las opciones para editar la información.

Este componente hace dos cosas diferentes.

Este tipo de prácticas también las puedes identificar cuando se pasan varios props booleanos.

Es un indicativo de que probablemente el componente tiene más de una responsabilidad.

Primero vamos a refactorizar este componente para que reciba por props lo que debe mostrar sin preocuparse del rol de usuario.

```
const JobOffer = ({ title, description, renderActions }) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      {renderActions()}
    </section>
  )
}
```

Con esto, nuestro componente JobOffer ya hace sólo una cosa y la hace bien.

```
<JobOffer
  title="React Developer"
  description="lorem ipsum"
  renderActions={() => <button>Apply</button>}
/>
```

Ya tenemos nuestro componente que hace sólo una cosa y la hace bien, ahora vamos a pasar al pricipio de responsabilidad única continuando con nuestra app para trabajos.

Ya que es un componente sin lógica cuya responsabilidad es mostrar elementos en la UI, necesitamos un componente que tenga la lógica necesaria para poder pasarle por props la información adecuada según lo que se necesite.

Digamos que tenemos un componente JobOfferContainer que tiene la lógica necesaria para ello.

```
const JobOfferContainer = ({ isRecruiter = true }) => {
  // sólo un reclutador puede editar una oferta
  const editJobOffer = () => {
    // código para editar
  }
  // sólo un aplicante puede aplicar a una oferta
  const applyToJobOffer = () => {
    // código para aplicar
  }
  const renderApplyAction = () => <button onClick={applyToJobOffer}>Apply</button>

  const renderEditAction = () => <button onClick={editJobOffer}>Edit Content</button>
  return (
    <div className="App">
      <JobOffer
        title="React Developer"
        description="lorem ipsum"
        renderActions={isRecruiter ? renderEditAction : renderApplyAction}
      />
    </div>
  )
}
```

Vemos que aparece de nuevo el booleano isRecruiter y que las funciones que tiene dentro se refieren a aplicar a vacante o editar vacante, dependiendo del rol de usuario.

Pues bien, nuestro componente JobOfferContainer tiene dos razones para cambiar debido a que depende de las necesidades de usuarios diferentes.

Es decir, cuando cambien las necesidades de un candidato para aplicar, probablemente terminemos modificando este componente. Y cuando cambien las necesidades de un reclutador para editar, también.

Una solución a esto es crear dos componentes de responsabilidades (o razones para cambiar) separadas: Un componente con la lógica para reclutador y otro para la lógica del aplicante.

```
const RecluiterJobOfferContainer = () => {
  const editJobOffer = () => {
    // código para editar
  }
  const renderEditAction = () => <button onClick={editJobOffer}>Edit Content</button>
  return (
    <div className="App">
      <JobOffer
        title="React Developer"
        description="lorem ipsum"
        renderActions={renderEditAction}
      />
    </div>
  )
}
```

Este componente hace sólo una cosa y tiene una sóla razón para cambiar.

Lo mismo aplica para el rol de aplicante, crearíamos un JobOfferApplicantContainer con su lógica para aplicar y reutilizando el componente JobOffer.

Por el momento, el mensaje que te quiero transmitir es que usando esta solución podemos reutilizar componentes, customizar el contenido y estructura en base a la composición de elementos.

Lo mismo que hemos aplicado a nivel de un componente que muestra información, también puede ser aplicado a un componente más global como a una o un grupo de páginas. El mismo principio aplica: **Cada módulo debe tener una sola razón para cambiar.**

## Liskov Substitution Principle

Debemos a Barbara Liskov la definición de este patrón en 1988. Nos dice:

> Para construir sistemas de software con partes intercambiables, esas partes se deben adherir a un contrato que permita que esas partes puedan ser reemplazadas por otras.

En la programación orientada a objetos, un contrato sería una interfaz en la que definimos lo que una clase debe implementar.

Pero Javascript no es un lenguaje tipado ni estático en el que podamos definir interfaces. Es aquí donde entra Typescript como alternativa para poder definir contratos por medio de interfaces. Por ejemplo:

```
interface User {
  name: String;
  run: Function;
}
```

Esta interfaz llamada User nos dice que su contrato es: la propiedad name que debe ser de tipo cadena y la propiedad run que debe ser de tipo función.

Esta es una buena razón para considerar usar **Typescript** en tus proyectos.

Pero también existen más alternativas como usar en conjunto **Prop Types**, **Eslint** y **Flow**, que son herramientas de desarrollo que nos ayudan a validar que nuestro código Javascript cumple con los tipados especificados.

En estae contenido no vamos a profundizar en estas herramientas ya que no es su propósito, pero es bueno que las tengas en mente.

Aunque la mayoría de los ejemplos son usando clases y herencia, en React la herencia no es recomendada debido a que su filosofía es crear componentes **declarativos** junto la **composición.**

En apps de la vida real se aplica mejor cuando usamos **contratos en los props y states** en los componentes como veremos a continuación.

```
const Greetings = ({ name }) => <h2>Hello {name}</h2>
```

Este componente recibe por props un valor name y lo renderiza. Para usarlo sería:

```
export default function App() {
  const name = 'John Doe'
  return (
    <div className="App">
      <h1>Liskov Substitution Principle</h1>
      <Greetings name={name} />
    </div>
  )
}
```

Esto funciona bien, pero ahora vamos a intercambiar el componente Greetings por uno diferente.

```
const AnotherGreetings = ({ firstname }) => <h2>Hello {firstname}</h2>
export default function App() {
  const name = 'John Doe'
  return (
    <div className="App">
      <h1>Liskov Substitution Principle</h1>
      <AnotherGreetings name={name} />
    </div>
  )
}
```

Vemos que AnotherGreetings en realidad espera recibir el prop firstname pero el componente App le pasa el prop name, por lo que no va a funcionar como esperamos.

Usando Typescript, podemos definir el contrato de los props del siguiente modo:

```
interface UserProps {
  name: string;
}

const Greetings = ({ name }: UserProps) => <h2>Hello {name}</h2>

const AnotherGreetings = ({ name }: UserProps) => <h2>Hi {name}</h2>

export default function App() {
  const name = 'John Doe'
  return (
    <div className="App">
      <h1>Liskov Substitution Principle</h1>
      <AnotherGreetings name={name} />
    </div>
  )
}
```

Y en tiempo de ejecución, si no respetamos los props definidos por UserProps, nos va a salir un error de transpilación.

Recuerda que si quieres asegurarte que tus componentes cumplen el principio de Liskov por medio de los props y el state, vale la pena aplicar las opciones antes mencionadas:

- Typescript.
- Prop Types, Eslint y Flow.

Este principio es útil tanto en patrones de UI como de lógica.

En los patrones de UI, si queremos maximizar la customización de un grupo de componentes por medio de la composición, es bueno considerar un contrato en los props para que podamos componer con uno u otro componente.

Lo anterior tendrá más sentido una vez que veas los patrones Render Props y Compound Pattern a detalle en sus capítulos correspondientes.

## Interface Segregation Principle

Este principio se enuncia como:

> Un sistema no debe depender en cosas que no necesita.

Un caso de uso en React es cuando un componente se le pasa por props valores de los que realmente necesita. Por ejemplo:

```
const Greetings = ({ user }) => <h2>Hello {user.name}</h2>
export default function App() {
  const user = {
    name: 'John Doe',
    age: 27,
    jobTitle: 'React Developer',
  }
  return (
    <div className="App">
      <h1>Liskov Substitution Principle</h1>
      <Greetings user={user} />
    </div>
  )
}
```

En este ejemplo tenemos que el componente Greetings recibe el props user que es un objeto con tres propiedades, pero en realidad sólo necesita la propiedad name.

Para corregirlo, hacemos:

```
const Greetings = ({ name }) => <h2>Hello {name}</h2>

export default function App() {
  const user = {
    name: 'John Doe',
    age: 27,
    jobTitle: 'React Developer',
  }
  return (
    <div className="App">
      <h1>Liskov Substitution Principle</h1>
      <Greetings name={user.name} />
    </div>
  )
}
```

Ahora sólo estamos pasando por props lo que el componente necesita.

Al igual que en Liskov Substitution Principle, en este principio también podemos utilizar las siguientes tecnologías para validar los props:

- Typescript.
- Prop Types, Eslint y Flow.

Y listo, con esto podemos aplicar este principio.

## Dependency Inversion Principle

La esencia de este principio la podemos resumir como:

> El código que implementa lógica de alto nivel no debe depender de código que implementa los detalles a bajo nivel. Ambos deben depender de abstracciones.

“¡¿Que?!”

Esa fue mi reacción la primera vez que leí esta definición. Lo podemos reformular como:

> Nuestro código debe depender de abstracciones, no de concretos.

**¿A qué nos referimos con abstracciones y concretos en este contexto?**

Un concreto es una función o clase que implementa una funcionalidad final en nuestra aplicación. Por ejemplo: un componente funcional que renderiza un botón o un componente que renderiza una página completa.

Una abstracción es una interfaz o clase que va a indicar qué es lo que deben implementar los elementos concretos. Por ejemplo: una interfaz usando Typescript.

Con esto en mente, podemos reformular de nuevo como:

> El código de nuestra aplicación debería depender de interfaces en vez de funciones o clases concretas.

Si aún suena confuso, no te preocupes. Es normal si es la primera vez que lees sobre este principio.

Vamos a ir paso a paso con ejemplos para que sea más fácil comprender la esencia de este principio y su aplicación.

En React, la inversión de dependencias se logra mediante el uso de interfaces en las dependencias.

Para empezar, definamos una dependencia como aquello que nuestro componente necesita para funcionar.

Por ejemplo: Es común ver en blogs ejemplos de componentes que hacen llamadas a apis como el siguiente:

```
const MyComponent = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('my-endpoint')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])
  if (!data) {
    return 'loading...'
  }
  return <div>{data.content}</div>
}
```

En este caso, fetch es una dependencia porque el componente depende de él para que pueda funcionar correctamente (tiene alto acoplamiento).

Podemos también notar lo siguiente en calidad de código:

- Este componente hace dos cosas: representa datos y tiene lógica de llamada a api.
- No está abierto a su extensión: Si en un futuro cambiamos nuestra api por otra fuente de datos como firebase, tendremos que cambiar nuestro componente aunque en la UI no cambie nada.
- Para hacer unit tests de este componente, tendremos que hacer un mock de fetch.

Como puedes ver, los principios de responsabilidad única y de abierto - cerrado se manifiestan también, lo cual es natural.

“Vale Juan, pero ¿Cómo lo puedo corregir?”.

¡Vamos a ello!

El primer cambio que haremos es crear una función separada que solo haga el fetch como lo necesitamos.

```
const fetchData = async () => {
  const response = await fetch('my-endpoint')
  const data = await response.json()
  return data
}
```

Nota que ahora estamos resolviendo las promesas con la sintaxis async await y retornamos la respuesta de nuestro endpoint.

Para mantener el ejemplo simple, no consideraremos los escenarios de fallos en la llamada a la api.

La manera de usarlo en el componente ahora es:

```
const MyComponent = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const load = async () => {
      const data = await fetchData()
      setData(data)
    }
    load()
  }, [])
  if (!data) {
    return 'loading...'
  }
  return <div>{data.content}</div>
}
```

Nota: para usar async await dentro de useEffect, necesitamos crear dentro una función debido que el callback de useEffect debe ser una función normal.

Ahora nuestro componente no está directamente acoplado con fetch, pero aun sigue teniendo la dependencia por medio de la función fetchData que hemos creado.

Para no estar usando la dependencia fetchData directamente vamos a aplicar la inyección de de dependencias antes de hacer la inversión de dependencias.

La inyección de dependencias simplemente consiste en inyectar por parámetro o props las dependencias que requerimos en lugar de usarlas directamente.

Para eso podemos usar un HOC o un React Context. Usaremos la segunda opción para variar en ejemplos.

```
const FetchContext = React.createContext(null)
export default function App() {
  return (
    <div className="App">
      <h1>Dependency Inversion</h1>
      <FetchContext.Provider value={fetchData}>
        <MyComponent />
      </FetchContext.Provider>
    </div>
  )
}
```

Con nuestro FetchContext estamos inyectando la función fetchData que definimos antes. Para usarlo seria:

```
const MyComponent = () => {
  const fetchDataFromContext = useContext(FetchContext)
  const [data, setData] = useState(null)
  useEffect(() => {
    const load = async () => {
      const data = await fetchDataFromContext()
      setData(data)
    }
    load()
  }, [fetchDataFromContext])
  if (!data) {
    return 'loading...'
  }
  return <div>{data.content}</div>
}
```

Con esto ya estamos inyectando nuestra función de llamada a api por medio de React Context.

Si en un futuro cambiamos la llamada a api por una llamada a firebase, lo único que tenemos que hacer es crear una nueva función con la lógica de llamada a firebase y reemplazarla en el value que pasamos por provider.

Por poner un ejemplo:

```
export default function App() {
  return (
    <div className="App">
      <h1>Dependency Inversion</h1>
      <FetchContext.Provider value={myAnotherDataFuncion}>
        <MyComponent />
      </FetchContext.Provider>
    </div>
  )
}
```

Y MyComponent no sabrá si estamos consumiendo una api, Firebase o lo que sea. Ese es parte de nuestro objetivo.

Esto es un buen cambio, pero todavía tenemos una dependencia de un concreto, que es la función fetchData que si bien la estamos inyectando, sigue siendo un concreto.

Una manera de ya no depender de un concreto es actualizar nuestro código con Typescript, declarar una interfaz y usar la interfaz en lugar el concreto.

Ahora nuestro componente depende de una abstracción, en este caso, la abstracción es representada por una interfaz de Typescript. Esa misma interfaz la usamos en fetchData para que su definición sea acorde con la firma de la interfaz.

De ese modo, si en el futuro hago una nueva función que consuma Firebase, al FetchContext.Provider no le va a importar porque dependerá de una abstracción, no de un concreto.


SOLID React + patrones = ❤️

**Los principios SOLID son el fundamento para crear y aplicar patrones de diseño en el desarrollo de software en general.**

Como hemos visto antes, podemos aplicar estos principios por medio de "patrones de diseño" al estilo de React JS.

A continuación te comparto una lista de otros [patrones avanzados](https://developero.io/blog/react-js-design-patterns) que también puedes aplicar en tus proyectos.

- **Custom Hook.** Los custom hooks consisten en la posibilidad de crear nuestros propios hooks para poder reusar lógica de estado entre componentes, esto de una manera que antes no se podía hacer con los componentes solamente.
- **Extensible Styles**. Al momento de desarrollar nuestros componentes, además de asegurarnos de que sean reusables sin necesidad de cambiar su código, también debemos preguntarnos si sus estilos también son reusables y abiertos al cambio. Esto lo resuelve Extensible Styles.
- **Compound Component Pattern**. Este patrón aprovecha al máximo la composición para que podamos implementar componentes muy flexibles que comparten un estado común pero haciendo que se comuniquen internamente sin necesidad de pasar props.
- **Control Props Pattern**. Este patrón está inspirado en la manera en que funcionan los formularios controlados.Imagina poder replicar esta lógica pero en cualquier componente, no solo en formularios. En esto consiste este patrón.
- **Props Getters Pattern**. El patrón props getters consiste en una manera de proveer un conjunto de props a los usuarios de tus componentes que van a necesitar en su implementación.
- **State Initializer Pattern**. Este es un patrón muy sencillo de implementar y consiste en proveer una manera para que el usuario de nuestro componente pueda definir el estado inicial y una vía para poder reiniciarlo.
- **State Reducers Pattern**. Este patrón consiste en otorgar al usuario el máximo control de cómo se debe actualizar el estado interno de un componente.
- **High Order Component (HOC) Pattern**. El patrón High Order Component (componente de orden superior en español) nos provee de una manera de reusar comportamiento entre componentes y desde luego, su existencia es posible por la naturaleza composicional de React.
- **Render Props Pattern**. Sirve para delegar la responsabilidad de hacer el render usando una función que el componente recibe por props.

Pero ojo, es muy importante identificar cuándo es adecuado aplicar cada patrón porque si lo hacemos en una situación donde realmente no es necesario, estaremos haciendo el código más complejo de lo que necesita ser.

**¿Quieres saber más sobre cómo aplicar estos patrones con sus pros, contras y con acceso al código fuente de ejemplos?**

Entonces te recomiendo que entres al [ebook que he publicado](https://developero.io/ebooks) de este tema tan interesante :).

Y también puedes ver el curso que he publicado en YouTube sobre los patrones de diseño en React JS usando Vite y TypeScript:

Si quieres saber más temas avanzados en React JS, entonces [Suscríbete al Canal de YouTube](https://www.youtube.com/c/developero?sub_confirmation=1) donde comparto gratuitamente vídeos sobre patrones y más temas relacionados con React JS.
