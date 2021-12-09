const continents = ['Africa', 'America', 'Europe', 'Asia', 'Austraila']
const helloContinents = Array.from( continents, c =>  `hello ${c}!` )
const message = helloContinents.join(' ')



const element = (
  <div title="Outer div">
    <h1>{message}!</h1>
  </div>
);

ReactDOM.render(element, document.getElementById('contents'));
