import { VFC, useState } from 'react'
import styled from 'styled-components'
import { TagsInput } from './TagsInput'

export const App: VFC = () => {
  const [tags, setTags] = useState<string[]>()
  const [addTag, setAddTag] = useState<string>()
  const [removeTag, setRemoveTag] = useState<string>()

  return (
    <Wrapper>
      <TagsInputDiv>
        <TagsInput
          placeholder={'delimiter is comma or Enter button'}
          onChangeTag={(tags: string[]) => setTags(tags)}
          onAddTag={(tag: string) => setAddTag(tag)}
          onRemoveTag={(tag: string) => setRemoveTag(tag)}
        />
      </TagsInputDiv>
      <Params>
        <h2>onChangeTag</h2>
        <ul>
          {tags?.map((tag) => (
            <li>{tag}</li>
          ))}
        </ul>
        <h2>onAddTag</h2>
        <div>{addTag}</div>
        <h2>onRemoveTag</h2>
        <div>{removeTag}</div>
      </Params>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0;
`
const TagsInputDiv = styled.div`
  width: 50%;
  min-width: 400px;
  margin: 0 auto;
`

const Params = styled.div`
  padding: 20px;
`
