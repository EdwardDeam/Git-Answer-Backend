# Git Answer Backend Code Style

From the rubric:  
`The code adheres to all team standards. The code is exceptionally well organised and very easy to follow. Comments are complete and useful; variables' and functions’ purposes are clearly communicated by their names.`

So try and keep that in mind when naming variables and functions. And add comments to code as you write it, much easier than having to add them in on thursday night!

## Prefered Packages

Try to use npm packages that have been used in the class as a preference. This makes it easier for everyone to know what is happening and easier for the teachers to help debug our code.

1. Joi for data validation.
2. JsonWebToken for creating tokens.
3. bCrypt for hashing passwords.

## Testing

Unit testing will use [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/). For testing endpoints we will use [Supertest](https://github.com/visionmedia/supertest) and a local Mongo test database. To check the coverage of code that has been tested we will use [Istanbul/NYC](https://github.com/istanbuljs/nyc). This package will show us what percentage of functions are being tested, as well as which lines are not being run during a test. As per the rubric, we will aim for 90% code coverage.

## Code style

### Linter / Code Formating

It looks like we already have the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) package installed in VSCode and we should keep that as the linter.

### Async & Await

Prefer to use Async Await over Promise.then() whenever possible.

#### Messy and hard to debug

```javascript
router.post("/", (req, res) => {
  let user = User.findOne({ email: req.body.email })
    .then(user => {
      if (user) return res.status(400).send("User already registered");

      user = new User(_.pick(req.body,
                      ["firstName", "lastName", "email", "password"]));

      bcrtpt.genSalt(10)
        .then(salt => {
          bcrtpt.hash(user.password, salt)
            .then(password =>{
              user.password = password;
              user.save()
                .then(user => {
                  const token = user.generateAuthToken();

                  res.header("x-auth-token", token).send(_.pick(user,
                            ["_id", "firstName", "lastName", "email"]));
                })
            })
        })
    })

  const salt = await bcrtpt.genSalt(10);
  user.password = await bcrtpt.hash(user.password, salt);
  await user.save();


});
```

#### Clean easy to read what is happening

```javascript
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(
    _.pick(req.body, ["firstName", "lastName", "email", "password"])
  );
  const salt = await bcrtpt.genSalt(10);
  user.password = await bcrtpt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "firstName", "lastName", "email"]));
});
```

### Wrapping Promises in try catch blocks

In future versions of NODE unhandled promise rejections will cause the app to crash, potentialy making the backend server unstable. To future proof the app whenever possible please wrap Promises in try catch blocks

#### Example

```javascript
const callApi = async () => {
  try {
    const value = await fetchData(2000, false);
    console.log(value);
  } catch (error) {
    console.error(error);
  }
};
```
