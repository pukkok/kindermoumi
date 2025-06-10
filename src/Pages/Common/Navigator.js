import React from "react"
import Container from "../../Components/Container"
import { Link, useHref, useParams } from "react-router-dom"
import classNames from "classnames"
import './styles/Navigator.css'

function Navigator({ main, sub, list }) {
  const href = useHref()
  const { serviceName } = useParams()

  return (
    <nav className="common-nav">
      <h1>{main}</h1>
      <p>{sub}</p>
      <Container>
        <ul>
          {list &&
            list.map((item, idx) => {
              const { active, link, description } = item
              const isActive = serviceName === active || link === href
              const isDisabled = !link

              return (
                <li
                  key={idx}
                  className={classNames({ active: isActive, disabled: isDisabled })}
                >
                  <Link className={isDisabled ? 'disabled' : ""} to={link}>{description}</Link>
                </li>
              )
            })}
        </ul>
      </Container>
    </nav>
  )
}

export default Navigator
