import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled from 'styled-components';

import { CommentType } from '@/contracts/comment';

dayjs.extend(relativeTime);

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <Container>
      <Avatar
        src={
          comment.user_avatar_url
            ? comment.user_avatar_url
            : 'https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo'
        }
      />
      <Details>
        <Name>
          {comment.user_name} <Date>{dayjs(comment.createdAt).fromNow()}</Date>
        </Name>
        <Text>{comment.comment_content}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
