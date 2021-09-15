import { useState, VFC, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import styled from 'styled-components'

type Tags = string[]

interface TagInputProps {
  defaultTags?: Tags
  placeholder?: string
  maxTags?: number
  canDuplicate?: boolean
  isFocusInput?: boolean
  onAddTag?: (tag: string) => void
  onRemoveTag?: (tag: string) => void
  onChangeTag?: (tags: Tags) => void
}

export const TagsInput: VFC<TagInputProps> = ({
  defaultTags,
  placeholder,
  maxTags,
  canDuplicate = false,
  isFocusInput = true,
  onAddTag,
  onRemoveTag,
  onChangeTag,
}) => {
  const [tags, setTags] = useState<string[]>(defaultTags || [])
  const [showInput, setShowInput] = useState<boolean>(true)

  useEffect(() => {
    maxTags === 0 && setShowInput(false)
  }, [maxTags])

  const removeTags = (indexToRemove: number) => {
    setTags((prevTags) => {
      const newTags = [
        ...prevTags.filter((_, index) => index !== indexToRemove),
      ]
      const removedTag = [
        ...prevTags.filter((_, index) => index === indexToRemove),
      ][0]
      onRemoveTag && onRemoveTag(removedTag)
      onChangeTag && onChangeTag(newTags)
      verifyMaxTags(newTags)

      return newTags
    })
  }

  const addTags = (
    e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ): void => {
    const word = e.currentTarget.value
    let modifiedWord = word.replace(/,/g, '')
    if (modifiedWord.trim() === '' || existDuplicateWord(e, modifiedWord)) {
      e.currentTarget.value = ''
      return
    }

    setTags((prevTags) => {
      const newTags = [...prevTags, modifiedWord]
      onAddTag && onAddTag(modifiedWord)
      onChangeTag && onChangeTag(newTags)
      verifyMaxTags(newTags)

      return newTags
    })
    e.currentTarget.value = ''
  }

  const existDuplicateWord = (
    e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    word: string,
  ): boolean => {
    if (!canDuplicate && tags.includes(word)) {
      e.currentTarget.value = ''
      alert('重複したデータがあります')
      return true
    }
    return false
  }

  const verifyMaxTags = (tags: string[]): void =>
    maxTags && tags.length >= maxTags ? setShowInput(false) : setShowInput(true)

  return (
    <TagsInputDiv>
      <Tags>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <TagTitle>{tag}</TagTitle>
            <TagCloseIcon onClick={() => removeTags(index)}>x</TagCloseIcon>
          </Tag>
        ))}
      </Tags>
      {showInput && (
        <Input
          isFocusInput={isFocusInput}
          addTags={addTags}
          placeholder={placeholder}
        />
      )}
    </TagsInputDiv>
  )
}

interface InputProps {
  isFocusInput: boolean | undefined
  addTags: (
    e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
  ) => void
  placeholder: string | undefined
}

const Input: VFC<InputProps> = ({ isFocusInput, addTags, placeholder }) => (
  <input
    ref={(input) => isFocusInput && input && input.focus()}
    type="text"
    onChange={(e) => {
      let word = e.target.value
      if (word.length > 1 && word.slice(-1) === ',') {
        addTags(e)
      }
    }}
    onKeyUp={(e) => (e.key === 'Enter' ? addTags(e) : null)}
    placeholder={placeholder}
  />
)

const TagsInputDiv = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 8px;
  margin: 5px 0;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;
  input {
    flex: 1;
    border: none;
    height: 35px;
    font-size: 14px;
    padding: 4px 0 0 0;
    min-width: 200px;
    &:focus {
      outline: transparent;
    }
  }
`
const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
`
const Tag = styled.li`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  color: black;
  padding: 0 8px;
  list-style: none;
  border-radius: 15px;
  margin: 0 8px 8px 0;
  background: #ccc;
  border: solid 1px black;
`
const TagTitle = styled.span`
  margin-top: 3px;
`
const TagCloseIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  margin-left: 8px;
  color: black;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
`
