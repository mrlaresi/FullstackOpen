import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
  const {course} = props
  console.log(course)
  return (
    <>
      {course.map((cour) => {
        return (
          <div key={cour.id}>
            <Header name={cour.name}/>
            <Content parts={cour.parts}/>
            <Total parts={cour.parts}/>
          </div>
        )
      })}
    </>
  )
}

export default Course