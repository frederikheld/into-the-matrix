document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
  <button id="btnFoo">Foo!</button>
</div>
`
export function foo() {
  console.log('foo')
  alert('foo')
}

document.querySelector<HTMLButtonElement>('#btnFoo')!.addEventListener('click', foo)
