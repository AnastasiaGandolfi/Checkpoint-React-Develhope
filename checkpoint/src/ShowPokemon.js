import React from 'react'

export function ShowPokemon({info}) {
  return (
    <div>
        <h3>{info.name}</h3>
        <h3>{info.base_exp}</h3>
        <h3>{info.abilities.map(item => <p>{item.ability.name}</p>)}</h3>
        <img src={info.img} />
    </div>
  )
}
