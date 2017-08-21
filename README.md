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
  }),
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
  }),
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
      author: 'foobar',
      last: 1,
    }
  }),
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
        author: context.get('username'),
        last: 1,
      }
    };
  }),
});
```

### Notes

- The computed queries are read only.
- Because they're computed properties, they're lazily loaded.
- They don't listen for changes to other properties in your models. Once they're called, that's it.

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
