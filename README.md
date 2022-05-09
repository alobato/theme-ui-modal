# Modal

> React modal

## Install

```sh
yarn add @alobato/modal
```

## Usage

```js
import { Modal }  from '@alobato/modal'
...
<Modal variant='small' shown={!!newMatch} onCancel={() => navigate(`/books${window.location.search}`)}>
  {({ onRequestClose }) => <New onRequestClose={onRequestClose} onCreate={() => listRef.current.callRefetch()} />}
</Modal>
```
