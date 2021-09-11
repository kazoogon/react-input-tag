import {VFC, useState} from 'react';
import styled from 'styled-components'
import {TagsInput} from "./TagsInput";

export const App: VFC = () => {
  const [tags, setTags] = useState<string[]>()
  const [addTags, setAddTags] = useState<string[]>()
  const [removeTags, setRemoveTags] = useState<string[]>()

  return (
    <Wrapper>
      <TagsInputDiv>
        <TagsInput
          placeholder={'delimiter is comma or Enter button'}
          onChangeTag={(tags: string[])=>setTags(tags)}
          onAddTag={(tags: string[])=>setAddTags(tags)}
          onRemoveTag={(tags: string[])=>setRemoveTags(tags)}
        />
      </TagsInputDiv>
      <Params>
        <h2>onChangeTag</h2>
        <ul>
          {tags?.map((tag)=><li>{tag}</li>)}
        </ul>
        <h2>onAddTag</h2>
        <ul>
          {addTags?.map((tag)=><li>{tag}</li>)}
        </ul>
        <h2>onRemoveTag</h2>
        <ul>
          {removeTags?.map((tag)=><li>{tag}</li>)}
        </ul>
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