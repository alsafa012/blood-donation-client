import useAllComments from "../../../../Components/hooks/useAllComments";
import useLoggedUserInfo from "../../../../Components/hooks/useLoggedUserInfo";

const MyComments = () => {
  const [allCommentsInfo, refetchComments] = useAllComments();
  const [loggedUserInfo] = useLoggedUserInfo();

  // const [allCommentsInfo, refetchComments] = useAllComments();

  const myComments = allCommentsInfo.filter(
    (comment) => comment.commented_person_id === loggedUserInfo._id
  );
  console.log(myComments);

  return (
    <div>
      <p> AllComments {allCommentsInfo.length}</p>
      <p> MyComments {myComments.length}</p>

      {/* {myComments.map((comment) => (
        <div key={comment._id}>

        </div>
      ))} */}
    </div>
  );
};

export default MyComments;
