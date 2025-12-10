# Applying SOLID principles in React

# Applying SOLID principles in React

Published on July 12, 2022

![cover picture](https://konstantinlebedev.com/static/3fd4a0be78f09c12ed350727a2908c4a/76983/cover.jpg "Photo by Jeff Nissen on Unsplash")

Photo by Jeff Nissen on Unsplash

As the software industry grows and makes mistakes, the best practices and good software design principles emerge and conceptualize to avoid repeating the same mistakes in the future. The world of object-oriented programming (OOP) in particular is a goldmine of such best practices, and SOLID is unquestionably one of the more influential ones.

SOLID is an acronym, where each letter represents one out of five design principles which are:

- **S**ingle responsibility principle (SRP)
- **O**pen-closed principle (OCP)
- **L**iskov substitution principle (LSP)
- **I**nterface segregation principle (ISP)
- **D**ependency inversion principle (DIP)

In this article, we’ll talk about the importance of each principle and see how we can apply the learnings from SOLID in React applications.

Before we begin though, **there’s a big caveat**. SOLID principles were conceived and outlined with object-oriented programming language in mind. These principles and their explanation heavily rely on concepts of classes and interfaces, while JS doesn’t really have either. What we often think of as “classes” in JS are merely class look-alikes simulated using its prototype system, and interfaces aren’t part of the language at all (although the addition of TypeScript does help a bit). Even more, the way we write modern React code is far from being object-oriented -  if anything, it feels more functional.

The good news though, software design principles such as SOLID are language agnostic and have a high level of abstraction, meaning that if we squint hard enough and take some liberties with interpretation, we’ll be able to apply them to our more functional React code.

So let’s take some liberties.

### Single responsibility principle (SRP)

The original definition states that “every class should have only one responsibility”, a.k.a. do exactly one thing. We can simply extrapolate the definition to “every function/module/component should do exactly one thing”, but to understand what “one thing” means we’ll need to examine our components from two different perspectives - internal (meaning what the component does inside) and external (how this component is used by other components).

We’ll start by looking from the inside. To ensure our components do one thing internally, we can:

- break large components that do too much into smaller components
- extract code unrelated to the main component functionality into separate utility functions
- encapsulate connected functionality into custom hooks

Now let’s see how we can apply this principle. We’ll start by considering the following example component that displays a list of active users:

|  |  |
| --- | --- |
|  | const ActiveUsersList = () => { |
|  | const [users, setUsers] = useState([]) |
|  |  |
|  | useEffect(() => { |
|  | const loadUsers = async () => { |
|  | const response = await fetch('/some-api') |
|  | const data = await response.json() |
|  | setUsers(data) |
|  | } |
|  |  |
|  | loadUsers() |
|  | }, []) |
|  |  |
|  | const weekAgo = new Date(); |
|  | weekAgo.setDate(weekAgo.getDate() - 7); |
|  |  |
|  | return ( |
|  | <ul> |
|  | {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => |
|  | <li key={user.id}> |
|  | <img src={user.avatarUrl} /> |
|  | <p>{user.fullName}</p> |
|  | <small>{user.role}</small> |
|  | </li> |
|  | )} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/ab02e8573db7f9dc2195250bfdc689fd/raw/23e65d6906969db80419cdaeea46be9510009b24/active-users-list.tsx)
[active-users-list.tsx](https://gist.github.com/koss-lebedev/ab02e8573db7f9dc2195250bfdc689fd#file-active-users-list-tsx)
hosted with ❤ by [GitHub](https://github.com)

Although this component is relatively short now, it is already doing quite a few things - it fetches data, filters it, renders the component itself as well as individual list items. Let’s see how we can break it down.

First of all, whenever we have connected `useState` and `useEffect` hooks, it’s a good opportunity to extract them into a custom hook:

|  |  |
| --- | --- |
|  | const useUsers = () => { |
|  | const [users, setUsers] = useState([]) |
|  |  |
|  | useEffect(() => { |
|  | const loadUsers = async () => { |
|  | const response = await fetch('/some-api') |
|  | const data = await response.json() |
|  | setUsers(data) |
|  | } |
|  |  |
|  | loadUsers() |
|  | }, []) |
|  |  |
|  | return { users } |
|  | } |
|  |  |
|  |  |
|  | const ActiveUsersList = () => { |
|  | const { users } = useUsers() |
|  |  |
|  | const weekAgo = new Date() |
|  | weekAgo.setDate(weekAgo.getDate() - 7) |
|  |  |
|  | return ( |
|  | <ul> |
|  | {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => |
|  | <li key={user.id}> |
|  | <img src={user.avatarUrl} /> |
|  | <p>{user.fullName}</p> |
|  | <small>{user.role}</small> |
|  | </li> |
|  | )} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/7e2a36e744241e3b08ea0ecbdf103f19/raw/2240724796220d9c52924bfdc7e642f0d6c61f1c/active-users-list-2.tsx)
[active-users-list-2.tsx](https://gist.github.com/koss-lebedev/7e2a36e744241e3b08ea0ecbdf103f19#file-active-users-list-2-tsx)
hosted with ❤ by [GitHub](https://github.com)

Now our `useUsers` hook is concerned with one thing only - fetching users from API. It also made our main component more readable, not only because it got shorter, but also because we replaced the structural hooks that you needed to decipher the purpose of with a domain hook the purpose of which is immediately obvious from its name.

Next, let’s look at the JSX that our component renders. Whenever we have a loop mapping over an array of objects, we should pay attention to the complexity of JSX it produces for individual array items. If it’s a one-liner that doesn’t have any event handlers attached to it, it’s totally fine to keep it inline, but for a more complex markup it could be a good idea to extract it into a separate component:

|  |  |
| --- | --- |
|  | const UserItem = ({ user }) => { |
|  | return ( |
|  | <li> |
|  | <img src={user.avatarUrl} /> |
|  | <p>{user.fullName}</p> |
|  | <small>{user.role}</small> |
|  | </li> |
|  | ) |
|  | } |
|  |  |
|  |  |
|  | const ActiveUsersList = () => { |
|  | const { users } = useUsers() |
|  |  |
|  | const weekAgo = new Date() |
|  | weekAgo.setDate(weekAgo.getDate() - 7) |
|  |  |
|  | return ( |
|  | <ul> |
|  | {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => |
|  | <UserItem key={user.id} user={user} /> |
|  | )} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/3eac0d0a06186cb6fca50b3e589af213/raw/0ee5f50cbd77dabfa04b03d8540342787b6b55d7/active-users-list-3.tsx)
[active-users-list-3.tsx](https://gist.github.com/koss-lebedev/3eac0d0a06186cb6fca50b3e589af213#file-active-users-list-3-tsx)
hosted with ❤ by [GitHub](https://github.com)

Just as with a previous change, we made our main component smaller and more readable by extracting the logic for rendering user items into a separate component.

Finally, we have the logic for filtering out inactive users from the list of all users we get from an API. This logic is relatively isolated and it could be reused in other parts of the application, so we can easily extract it into a utility function:

|  |  |
| --- | --- |
|  | const getOnlyActive = (users) => { |
|  | const weekAgo = new Date() |
|  | weekAgo.setDate(weekAgo.getDate() - 7) |
|  |  |
|  | return users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo) |
|  | } |
|  |  |
|  | const ActiveUsersList = () => { |
|  | const { users } = useUsers() |
|  |  |
|  | return ( |
|  | <ul> |
|  | {getOnlyActive(users).map(user => |
|  | <UserItem key={user.id} user={user} /> |
|  | )} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/e311f7e6569ae1e7b04c1276140f04a8/raw/f8e57223011cc41882bb8159985c4be64d4f1623/active-users-list-4.tsx)
[active-users-list-4.tsx](https://gist.github.com/koss-lebedev/e311f7e6569ae1e7b04c1276140f04a8#file-active-users-list-4-tsx)
hosted with ❤ by [GitHub](https://github.com)

At this point, our main component is short and straightforward enough that we can stop breaking it down and call it a day. However, if we look a bit closer, we’ll notice that it’s still doing more than it should. Currently, our component is fetching data and then applying filtering to it, but ideally, we’d just want to get the data and render it, without any additional manipulation. So as the last improvement, we can encapsulate this logic into a new custom hook:

|  |  |
| --- | --- |
|  | const useActiveUsers = () => { |
|  | const { users } = useUsers() |
|  |  |
|  | const activeUsers = useMemo(() => { |
|  | return getOnlyActive(users) |
|  | }, [users]) |
|  |  |
|  | return { activeUsers } |
|  | } |
|  |  |
|  | const ActiveUsersList = () => { |
|  | const { activeUsers } = useActiveUsers() |
|  |  |
|  | return ( |
|  | <ul> |
|  | {activeUsers.map(user => |
|  | <UserItem key={user.id} user={user} /> |
|  | )} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/d3cd55237aaea086fb1dfb15786b4eca/raw/5cb7289298103838325b39da616426bb5ab32344/active-users-list-5.tsx)
[active-users-list-5.tsx](https://gist.github.com/koss-lebedev/d3cd55237aaea086fb1dfb15786b4eca#file-active-users-list-5-tsx)
hosted with ❤ by [GitHub](https://github.com)

Here we created `useActiveUsers` hook to take care of fetching and filtering logic (we also memoized filtered data for good measures), while our main component is left to do the bare minimum - render the data it gets from the hook.

Now depending on our interpretation of “one thing”, we can argue that the component is still first getting the data, and then rendering it, which is not “one thing”. We could split it even further, calling a hook in one component and then passing the result to another one as props, but I found very few cases where this is actually beneficial in real-world applications, so let’s be forgiving with the definition and accept “rendering data the component gets” as “one thing”.

Now for the external perspective. Our components never exist in isolation, instead, they’re a part of a larger system in which they interact by either providing their functionality to other components, or consuming functionality provided by other components. As such, the external view of SRP is concerned with how many things a component can be used for.

To understand it better, let’s consider the following example. Imagine a messaging app (like Telegram or FB Messenger) and a component that displays a single message. It can be as simple as this:

```
const Message = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}
```

If we want to send images together with text, the component becomes a bit more complex:

```
const Message = ({ text, imageUrl }) => {
  return (
    <div>
      {imageUrl && <img src={imageUrl} />}
      {text && <p>{text}</p>}
    </div>
  )
}
```

Going further, we can add support for voice messages as well, which will further complicate the component:

```
const Message = ({ text, imageUrl, audioUrl }) => {
  if (audioUrl) {
    return (
      <div>
        <audio controls>
          <source src={audioUrl} />
        </audio>
      </div>
    )
  }

  return (
    <div>
      {imageUrl && <img src={imageUrl} />}
      {text && <p>{text}</p>}
    </div>
  )
}
```

It’s not difficult to imagine how, as time goes on and we add support for videos, stickers, etc., this component will keep growing and turn into a giant mess. Let’s recap what’s happening here.

At the start, our component complies with SRP and it does exactly one thing - it renders a message. However, as the application evolves, we gradually add more and more functionality to it. We start with small conditional changes in render logic, then go more aggressively completely replacing the render tree, and somewhere along the way the original definition of “one thing” for this component becomes too broad, too generic. We start with a single-purpose component and end up with a multipurpose do-it-all kind.

The way to solve this problem is to get rid of the generic Message component in favor of more specialized, single-purpose components:

```
const TextMessage = ({ text }) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  )
}

const ImageMessage = ({ text, imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} />
      {text && <p>{text}</p>}
    </div>
  )
}

const AudioMessage = ({ audioUrl }) => {
  return (
    <div>
      <audio controls>
        <source src={audioUrl} />
      </audio>
    </div>
  )
}
```

The logic inside these components is very different from one another, so it’s natural for them to evolve separately.

It should be said that problems like this always creep in *gradually* as the application grows. You want to reuse an existing component/function that does *almost* everything you need, so you throw in an extra prop/argument and adjust the logic inside accordingly. Next time, somebody else ends up in the same situation, and instead of creating separate components and extracting shared logic, they add another argument and another `if`. The snowball keeps growing.

To break out of this loop, next time you’re about to adjust an existing component to fit your case, consider whether you’re doing it because it makes sense and it will make the component more reusable, or because you’re just being lazy. Beware of the problem of universal components and pay attention to how you define what its single responsibility is.

On a practical side, a good indication that a component has outgrown its original purpose and requires splitting is a bunch of `if` statements changing the behavior of the component. It applies to plain JS functions as well - if you keep adding arguments that control the execution flow inside a function to produce different results, you might be looking at a function that’s doing too much. Another sign is a component with a lot of optional props. If you use such a component by supplying a distinct subset of properties in different contexts, chances are you deal with multiple components masquerading as one.

To summarize, the single-responsibility principle is concerned with keeping our components small and single purpose. Such components are easier to reason about, easier to test and modify, and we’re less likely to introduce unintentional code duplication.

### Open-closed principle (OCP)

OCP states that “software entities should be open for extension, but closed for modification”. Since our React components and functions are software entities, we don’t need to bend the definition at all, and instead, we can take it in its original form.

The open-closed principle advocates for structuring our components in a way that allows them to be extended without changing their original source code. To see it in action, let’s consider the following scenario - we’re working on an application that uses a shared `Header` component on different pages, and depending on the page we’re at, `Header` should render a slightly different UI:

|  |  |
| --- | --- |
|  | const Header = () => { |
|  | const { pathname } = useRouter() |
|  |  |
|  | return ( |
|  | <header> |
|  | <Logo /> |
|  | <Actions> |
|  | {pathname === '/dashboard' && <Link to="/events/new">Create event</Link>} |
|  | {pathname === '/' && <Link to="/dashboard">Go to dashboard</Link>} |
|  | </Actions> |
|  | </header> |
|  | ) |
|  | } |
|  |  |
|  | const HomePage = () => ( |
|  | <> |
|  | <Header /> |
|  | <OtherHomeStuff /> |
|  | </> |
|  | ) |
|  |  |
|  | const DashboardPage = () => ( |
|  | <> |
|  | <Header /> |
|  | <OtherDashboardStuff /> |
|  | </> |
|  | ) |

[view raw](https://gist.github.com/koss-lebedev/ff35af2a24cc10ad7798fba6f1262218/raw/8623588faf4ec6dc9adbe96a96f069695ad03f35/header.tsx)
[header.tsx](https://gist.github.com/koss-lebedev/ff35af2a24cc10ad7798fba6f1262218#file-header-tsx)
hosted with ❤ by [GitHub](https://github.com)

Here we render links to different page components depending on the current page we’re at. It’s easy to realize that this implementation is bad if we think about what will happen when we start adding more pages. Every time a new page is created, we’ll need to go back to our `Header` component and adjust its implementation to make sure it knows which action link to render. Such an approach makes our `Header` component fragile and tightly coupled to the context in which it’s used, and it goes against the open-closed principle.

To fix this problem, we can use component composition. Our Header component doesn’t need to concern itself with what it will render inside, and instead, it can delegate this responsibility to the components that will use it using `children` prop:

|  |  |
| --- | --- |
|  | const Header = ({ children }) => ( |
|  | <header> |
|  | <Logo /> |
|  | <Actions> |
|  | {children} |
|  | </Actions> |
|  | </header> |
|  | ) |
|  |  |
|  | const HomePage = () => ( |
|  | <> |
|  | <Header> |
|  | <Link to="/dashboard">Go to dashboard</Link> |
|  | </Header> |
|  | <OtherHomeStuff /> |
|  | </> |
|  | ) |
|  |  |
|  |  |
|  | const DashboardPage = () => ( |
|  | <> |
|  | <Header> |
|  | <Link to="/events/new">Create event</Link> |
|  | </Header> |
|  | <OtherDashboardStuff /> |
|  | </> |
|  | ) |

[view raw](https://gist.github.com/koss-lebedev/9c92799addb177c15a8c2139a7f3660c/raw/2dbcfc20af9891312ff15267934c165c5fbd5d51/header-2.tsx)
[header-2.tsx](https://gist.github.com/koss-lebedev/9c92799addb177c15a8c2139a7f3660c#file-header-2-tsx)
hosted with ❤ by [GitHub](https://github.com)

With this approach, we completely remove the variable logic that we had inside of the `Header` and now can use composition to put there literally anything we want without modifying the component itself. A good way of thinking about it is that we provide a placeholder in the component that we can plug into. And we’re not limited to one placeholder per component either - if we need to have multiple extension points (or if the `children` prop is already used for a different purpose), we can use any number of props instead. If we need to pass some context from the `Header` to components that use it, we can use the [render props pattern](https://reactjs.org/docs/render-props). As you can see, composition can be very powerful.

Following the open-closed principle, we can reduce coupling between the components, and make them more extensible and reusable.

### Liskov substitution principle (LSP)

LSP recommends designing objects in such a way that “subtype objects should be substitutable for supertype objects”. In its original definition, the subtype/supertype relationship is achieved via class inheritance, but it doesn’t have to be that way. In a broader sense, inheritance is simply basing one object upon another object while retaining a similar implementation, and this is something we do in React quite often.

A very basic example of a subtype/supertype relationship could be demonstrated with a component built with styled-components library (or any other CSS-in-JS library that uses similar syntax):

```
import styled from 'styled-components'

const Button = (props) => { /* ... */ }

const StyledButton = styled(Button)`
  border: 1px solid black;
  border-radius: 5px;
`

const App = () => {
  return <StyledButton onClick={handleClick} />
}
```

In the code above, we create `StyledButton` based on `Button` component. This new `StyledButton` component adds a few CSS classes but it retains the implementation of the original `Button`, so, in this context, we can think of our `Button` and `StyledButton` as supertype and subtype components.

Additionally, `StyledButton` also conforms to the interface of the component it’s based on - it takes the same props as `Button` itself. Because of that, we can easily swap `StyledButton` for `Button` anywhere in our application without breaking it or needing to make any additional changes. That’s the benefit we get by conforming to the Liskov substitution principle.

Here’s a more interesting example of basing one component on another:

```
type Props = InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => { /* ... */ }

const CharCountInput = (props: Props) => {
  return (
    <div>
      <Input {...props} />
      <span>Char count: {props.value.length}</span>
    </div>
  )
}
```

In the code above, we use a basic `Input` component to create an enhanced version of it that can also display the number of characters in the input. Although we add new logic to it, `CharCountInput` still retains the functionality of the original `Input` component. The interface of the component also remains unchanged (both inputs take the same props), so LSP is observed again.

Liskov substitution principle is particularly useful in the context of components sharing common traits, such as icons or inputs  - one icon component should be swappable for another icon, more specific `DatePickerInput` and `AutocompleteInput` components should be swappable for a more generic `Input` component, and so on. However, we should acknowledge that this principle cannot and should not always be observed. More often than not, we create sub-components with the goal of adding new functionality that their super-components don’t have, and that will often break the interface of the super-component. This is a completely valid use case, and we shouldn’t try to shoehorn LSP everywhere.

As for components where LSP does make sense, we need to make sure that we don’t break the principle *unnecessarily*. Let’s take a look at two common ways in which it may happen.

The first one involves cutting off a part of props without a reason:

```
type Props = { value: string; onChange: () => void }

const CustomInput = ({ value, onChange }: Props) => {
  // ...some additional logic

  return <input value={value} onChange={onChange} />
}
```

Here, we redefine props for `CustomInput` instead of using props that `<input />` expects. As a result, we lose a large subset of properties that `<input />` can take thus breaking its interface. To fix that, we should use the props that the original `<input />` expects and pass them all down using a spread operator:

```
type Props = InputHTMLAttributes<HTMLInputElement>

const CustomInput = (props: Props) => {
  // ...some additional logic

  return <input {...props} />
}
```

Another way to break LSP is to use aliases for some of the properties. This may happen when the property we want to use has a naming conflict with a local variable:

```
type Props = HTMLAttributes<HTMLInputElement> & {
  onUpdate: (value: string) => void
}

const CustomInput = ({ onUpdate, ...props }: Props) => {
  const onChange = (event) => {
    /// ... some logic
    onUpdate(event.target.value)
  }

  return <input {...props} onChange={onChange} />
}
```

To avoid such conflicts, you want to have a good naming convention for your local variables. For example, it’s common to have a matching `handleSomething` local function for every `onSomething` property:

```
type Props = HTMLAttributes<HTMLInputElement>

const CustomInput = ({ onChange, ...props }: Props) => {
  const handleChange = (event) => {
    /// ... some logic
    onChange(event)
  }

  return <input {...props} onChange={handleChange} />
}
```

### Interface segregation principle (ISP)

According to ISP, “clients should not depend upon interfaces that they don’t use.” For the sake of React applications, we’ll translate it into “components shouldn’t depend on props that they don’t use”.

We’re stretching the definition of the ISP here, but it’s not a big stretch - both props and interfaces can be defined as contracts between the object (component) and the outside world (the context in which it’s used), so we can draw parallels between the two. In the end, it’s not about being strict and unyielding with the definitions, but about applying generic principles in order to solve a problem.

To better illustrate the problem ISP is targeting, we’ll use TypeScript for the next example. Let’s consider the application that renders a list of videos:

|  |  |
| --- | --- |
|  | type Video = { |
|  | title: string |
|  | duration: number |
|  | coverUrl: string |
|  | } |
|  |  |
|  | type Props = { |
|  | items: Array<Video> |
|  | } |
|  |  |
|  | const VideoList = ({ items }) => { |
|  | return ( |
|  | <ul> |
|  | {items.map(item => |
|  | <Thumbnail |
|  | key={item.title} |
|  | video={item} |
|  | /> |
|  | )} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/f7effe48947651d50079b27686ed9052/raw/997b9298f14c3bb503dead62ae6f2841009b2729/video-list.tsx)
[video-list.tsx](https://gist.github.com/koss-lebedev/f7effe48947651d50079b27686ed9052#file-video-list-tsx)
hosted with ❤ by [GitHub](https://github.com)

Our `Thumbnail` component that it uses for each item might look something like this:

|  |  |
| --- | --- |
|  | type Props = { |
|  | video: Video |
|  | } |
|  |  |
|  | const Thumbnail = ({ video }: Props) => { |
|  | return <img src={video.coverUrl} /> |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/5662eb6483b1656eaf73fd36e2f65e22/raw/5d95f57d8149e3b3adc4b6277c6624fcc95ddf78/thumbnail.tsx)
[thumbnail.tsx](https://gist.github.com/koss-lebedev/5662eb6483b1656eaf73fd36e2f65e22#file-thumbnail-tsx)
hosted with ❤ by [GitHub](https://github.com)

The `Thumbnail` component is quite small and simple, but it has one problem - it expects a full video object to be passed in as props, while effectively using only one of its properties.

To see why that’s problematic, imagine that in addition to videos, we decide to display thumbnails for live streams as well, with both kinds of media resources mixed in the same list.

We’ll introduce a new type defining a live stream object:

|  |  |
| --- | --- |
|  | type LiveStream = { |
|  | name: string |
|  | previewUrl: string |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/7fe6bd3f7d748bc7fcbf7eea730c0d74/raw/94e006951aab0c57da5729807519127b2ab4b71f/live-stream.tsx)
[live-stream.tsx](https://gist.github.com/koss-lebedev/7fe6bd3f7d748bc7fcbf7eea730c0d74#file-live-stream-tsx)
hosted with ❤ by [GitHub](https://github.com)

And this is our updated `VideoList` component:

|  |  |
| --- | --- |
|  | type Props = { |
|  | items: Array<Video | LiveStream> |
|  | } |
|  |  |
|  | const VideoList = ({ items }) => { |
|  | return ( |
|  | <ul> |
|  | {items.map(item => { |
|  | if ('coverUrl' in item) { |
|  | // it's a video |
|  | return <Thumbnail video={item} /> |
|  | } else { |
|  | // it's a live stream, but what can we do with it? |
|  | } |
|  | })} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/5262e8b0c792e1765faaf4da323f1bef/raw/3d0d57a598571909208d97e96e2459e78a9b2ac1/video-list-2.tsx)
[video-list-2.tsx](https://gist.github.com/koss-lebedev/5262e8b0c792e1765faaf4da323f1bef#file-video-list-2-tsx)
hosted with ❤ by [GitHub](https://github.com)

As you can see, here we have a problem. We can easily distinguish between video and live stream objects, but we cannot pass the latter to the `Thumbnail` component because `Video` and `LiveStream` are incompatible. First, they have different types, so TypeScript would immediately complain. Second, they contain the thumbnail URL under different properties - video object calls it `coverUrl`, live stream object calls it `previewUrl`. That’s the crux of the problem with having components depend on more props than they actually need - they become less reusable. So let’s fix it.

We’ll refactor our `Thumbnail` component to make sure it relies only on props it requires:

|  |  |
| --- | --- |
|  | type Props = { |
|  | coverUrl: string |
|  | } |
|  |  |
|  | const Thumbnail = ({ coverUrl }: Props) => { |
|  | return <img src={coverUrl} /> |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/d06dfe90ecf099c9fd2eba7398bb7d2d/raw/5a0c450feb2c079c361301d90c55ed48091adfed/thumbnail-2.tsx)
[thumbnail-2.tsx](https://gist.github.com/koss-lebedev/d06dfe90ecf099c9fd2eba7398bb7d2d#file-thumbnail-2-tsx)
hosted with ❤ by [GitHub](https://github.com)

With this change, now we can use it for rendering thumbnails of both videos and live streams:

|  |  |
| --- | --- |
|  | type Props = { |
|  | items: Array<Video | LiveStream> |
|  | } |
|  |  |
|  | const VideoList = ({ items }) => { |
|  | return ( |
|  | <ul> |
|  | {items.map(item => { |
|  | if ('coverUrl' in item) { |
|  | // it's a video |
|  | return <Thumbnail coverUrl={item.coverUrl} /> |
|  | } else { |
|  | // it's a live stream |
|  | return <Thumbnail coverUrl={item.previewUrl} /> |
|  | } |
|  | })} |
|  | </ul> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/df163d6d1f6efd2afd4d82e27b2531f6/raw/c75aefb2fc8bb44416f43baa9ced8d01febb64ff/video-list-3.tsx)
[video-list-3.tsx](https://gist.github.com/koss-lebedev/df163d6d1f6efd2afd4d82e27b2531f6#file-video-list-3-tsx)
hosted with ❤ by [GitHub](https://github.com)

The interface segregation principle advocates for minimizing dependencies between the components of the system, making them less coupled and thus more reusable.

### Dependency inversion principle (DIP)

The dependency inversion principle states that “one should depend upon abstractions, not concretions”. In other words, one component shouldn’t directly depend on another component, but rather they both should depend on some common abstraction. Here, “component” refers to any part of our application, be that a React component, a utility function, a module, or a 3rd party library. This principle might be difficult to grasp in the abstract, so let’s jump straight into an example.

Below we have `LoginForm` component that sends user credentials to some API when the form is submitted:

|  |  |
| --- | --- |
|  | import api from '~/common/api' |
|  |  |
|  | const LoginForm = () => { |
|  | const [email, setEmail] = useState('') |
|  | const [password, setPassword] = useState('') |
|  |  |
|  | const handleSubmit = async (evt) => { |
|  | evt.preventDefault() |
|  | await api.login(email, password) |
|  | } |
|  |  |
|  | return ( |
|  | <form onSubmit={handleSubmit}> |
|  | <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> |
|  | <input type="password" value={password} onChange={e => setPassword(e.target.value)} /> |
|  | <button type="submit">Log in</button> |
|  | </form> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/49c7a0d5c65190224e327f0640a5dfbd/raw/2ef284236d4ea2b5183ec99506e02dbdd4b499ba/login-form.tsx)
[login-form.tsx](https://gist.github.com/koss-lebedev/49c7a0d5c65190224e327f0640a5dfbd#file-login-form-tsx)
hosted with ❤ by [GitHub](https://github.com)

In this piece of code, our `LoginForm` component directly references the `api` module, so there’s a tight coupling between them. This is bad because such dependency makes it more challenging to make changes in our code, as a change in one component will impact other components. The dependency inversion principle advocates for breaking such coupling, so let’s see how we can achieve that.

First, we’re going to remove direct reference to the `api` module from inside the `LoginForm`, and instead, allow for the required functionality to be injected via props:

|  |  |
| --- | --- |
|  | type Props = { |
|  | onSubmit: (email: string, password: string) => Promise<void> |
|  | } |
|  |  |
|  | const LoginForm = ({ onSubmit }: Props) => { |
|  | const [email, setEmail] = useState('') |
|  | const [password, setPassword] = useState('') |
|  |  |
|  | const handleSubmit = async (evt) => { |
|  | evt.preventDefault() |
|  | await onSubmit(email, password) |
|  | } |
|  |  |
|  | return ( |
|  | <form onSubmit={handleSubmit}> |
|  | <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> |
|  | <input type="password" value={password} onChange={e => setPassword(e.target.value)} /> |
|  | <button type="submit">Log in</button> |
|  | </form> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/6848adc63e3cc429bcc70ff35ae1e3bc/raw/5f35634ad98ddd72c0887e724d5c00e54589a067/login-form-2.tsx)
[login-form-2.tsx](https://gist.github.com/koss-lebedev/6848adc63e3cc429bcc70ff35ae1e3bc#file-login-form-2-tsx)
hosted with ❤ by [GitHub](https://github.com)

With this change, our `LoginForm` component no longer depends on the `api` module. The logic for submitting credentials to the API is abstracted away via `onSubmit` callback, and now it is the responsibility of the parent component to provide the concrete implementation of this logic.

To do that, we’ll create a connected version of the `LoginForm` that will delegate form submission logic to the `api` module:

|  |  |
| --- | --- |
|  | import api from '~/common/api' |
|  |  |
|  | const ConnectedLoginForm = () => { |
|  | const handleSubmit = async (email, password) => { |
|  | await api.login(email, password) |
|  | } |
|  |  |
|  | return ( |
|  | <LoginForm onSubmit={handleSubmit} /> |
|  | ) |
|  | } |

[view raw](https://gist.github.com/koss-lebedev/bbd84a82031163fed8f7801b004bf817/raw/c31ed33b777bf0669f509507297ea573e39b3156/connected-login-form.tsx)
[connected-login-form.tsx](https://gist.github.com/koss-lebedev/bbd84a82031163fed8f7801b004bf817#file-connected-login-form-tsx)
hosted with ❤ by [GitHub](https://github.com)

`ConnectedLoginForm` component serves as a glue between the `api` and `LoginForm`, while they themselves remain fully independent of each other. We can iterate on them and test them in isolation without worrying about breaking dependent moving pieces as there are none. And as long as both `LoginForm` and `api` adhere to the agreed common abstraction, the application as a whole will continue working as expected.

In the past, this approach of creating “dumb” presentational components and then injecting logic into them was also used by many 3rd party libraries. The most well-known example of it is Redux, which would bind callback props in the components to `dispatch` functions using `connect` higher-order component (HOC). With the introduction of hooks this approach became somewhat less relevant, but injecting logic via HOCs still has utility in React applications.

To conclude, the dependency inversion principle aims to minimize coupling between different components of the application. As you’ve probably noticed, minimizing is somewhat of a recurring theme throughout all SOLID principles - from minimizing the scope of responsibilities for individual components to minimizing cross-component awareness and dependencies between them.

### Conclusion

Despite being born out of problems of the OOP world, SOLID principles have their application well beyond it. In this article, we’ve seen how by having some flexibility with interpretations of these principles, we managed to apply them to our React code and make it more maintainable and robust.

It’s important to remember though, that being dogmatic and religiously following these principles may be damaging and lead to over-engineered code, so we should learn to recognize when further decomposition or decoupling of components stands to introduce complexity for little to no benefit.
