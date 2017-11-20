# ember-computed-query

Computed properties for your models that's equivalent to your store's query functions

## Installation

```bash
ember install ember-computed-query
```

## Usage

### Querying for multiple records

#### Options as an object

```javascript
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { query } from 'ember-computed-query';

export default Model.extend({
  username: attr('string'),

  comments: query('comment', {
    filter: {
      author: 'foobar'
    }
  }, 'username')
});
```

#### Options as a callback

```javascript
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { query } from 'ember-computed-query';

export default Model.extend({
  username: attr('string'),

  comments: query('comment', (context) => {
    return {
      filter: {
        author: context.get('username')
      }
    };
  }, 'username')
});
```

### Querying for a single record

#### Options as an object

```javascript
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { queryRecord } from 'ember-computed-query';

export default Model.extend({
  username: attr('string'),

  newestComment: queryRecord('comment', {
    filter: {
      author: 'foobar'
    }
  }, 'username')
});
```

#### Options as a callback

```javascript
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

import { queryRecord } from 'ember-computed-query';

export default Model.extend({
  username: attr('string'),

  newestComment: queryRecord('comment', (context) => {
    return {
      filter: {
        author: context.get('username')
      }
    };
  }, 'username')
});
```

### Notes

- Because they're computed properties, they're lazily loaded.
- In the examples above, changing `username` will invalidate the computed query cache. This means that the computed query will run again on the next access.

## Contributing

### Installation

* `git clone <repository-url>` this repository
* `cd ember-computed-query`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
