# React Toast Notifications
![npm](https://img.shields.io/npm/v/@ajoelp/toast)
![Test](https://github.com/ajoelp/toast/workflows/Test/badge.svg?branch=main)

## Getting Started

```sh
npm install @ajoelp/toast
```


Install the toast wrapper in your root app file.

```jsx
import React from 'react';
import { ToastWrapper } from '@ajoelp/toast';

function App(){
  return <ToastWrapper />
}
```

Trigger toast notifications from anywhere in your application

```jsx
import { toast } from '@ajoelp/toast';


toast("This is the toast message", {
  type: 'success' | 'error' | 'info' | 'warning',
  isHtml: true,
  delay: 1500
})

// Or use the typed helpers

toast.info("This is the toast message")
toast.success("This is the toast message")
toast.error("This is the toast message")
toast.warning("This is the toast message")

```

Override the toast message component


```jsx
import React from 'react';
import { ToastWrapper } from '@ajoelp/toast';

function CustomContainer({ close, message, active, options}){
  return (
    <p>{message}</p>
  )
}

function App(){
  return <ToastWrapper toastContainer={CustomContainer} />
}
```
