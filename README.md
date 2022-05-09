# Theme UI Modal

> Theme UI Modal

## Install

```sh
yarn add theme-ui-modal
```

## Usage

```js
import { Modal }  from 'theme-ui-modal'
...
<Modal variant='small' shown={!!newMatch} onCancel={() => navigate(`/books${window.location.search}`)}>
  {({ onRequestClose }) => <New onRequestClose={onRequestClose} onCreate={() => listRef.current.callRefetch()} />}
</Modal>
```
