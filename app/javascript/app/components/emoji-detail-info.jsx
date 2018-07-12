import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import PropTypes from 'prop-types';

import EmojiShape from './shapes/emoji';

const Container = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin: 10px;
`;

const Info = styled.div`
  flex-grow: 1;
  margin-left: 20px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0;
`;

const Name = styled.div`
  display: block;
  padding: 6px 10px;
`;

const NameText = styled.span`
  padding: 0 5px 0;
  word-break: break-all
`;

const NameForm = styled.input`
  display: block;
  border: none;
  font-weight: bold;
  padding: 6px 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const UserName = styled.h2`
  font-size: 1.1rem;
  font-weight: normal;
  color: #8d8d8d;
  margin: 5px 0;
`;

const Description = styled.p`
  margin: 16px 0;
`;

const DescriptionForm = styled.textarea`
  display: block;
  width: 100%;
  border: none;
  background-color: #f5f5f5;
  padding: 6px 10px;
  border-radius: 5px;
  margin: 16px 0;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const Download = styled.div`
  font-size: 1.2rem;
  color: #8d8d8d;
`;

const Button = styled.button`
  display: ${props => (props.isShow ? 'inline-block' : 'none')};
  border: none;
  background-color: #464646;
  color: #ffffff;
  line-height: 1rem;
  border-radius: 0.9rem;
  padding: 0.3rem 15px 0.5rem 10px;
  margin-right: 10px;

  :disabled {
    background-color: #999999;
  }
`;

const EditButton = styled(Button)`
`;

const DeleteButton = styled(Button)`
  background-color: #d32f2f;
`;

class EmojiDetailInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  render() {
    const { isEditing } = this.state;
    const { emoji } = this.props;

    return (
      <Container>
        <Img alt={emoji.name} src={emoji.images.thumb_url} />
        <Info>
          <TitleArea>
            <div>
              <Title>
                {
                  isEditing
                    ? <NameForm type="text" value={emoji.name} />
                    : <Name>:<NameText>{ emoji.name }</NameText>:</Name>
                }
              </Title>
              <UserName>by { emoji.user.name }</UserName>
            </div>
            <Download>
              <FontAwesomeIcon icon={faDownload} /> {emoji.number_of_downloaded}
            </Download>
          </TitleArea>
          {
            isEditing
              ? <DescriptionForm value={emoji.description} />
              : <Description>{ emoji.description }</Description>
          }
          <EditButton
            isShow
            onClick={() => this.setState({ isEditing: !isEditing })}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
            { isEditing ? ' save' : ' edit emoji' }
          </EditButton>
          <DeleteButton
            isShow
            disabled={isEditing}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> delete emoji
          </DeleteButton>
        </Info>
      </Container>
    );
  }
}

EmojiDetailInfo.propTypes = {
  emoji: EmojiShape.isRequired,
  accessToken: PropTypes.string,
};

EmojiDetailInfo.defaultProps = {
  accessToken: null,
};

export default EmojiDetailInfo;
