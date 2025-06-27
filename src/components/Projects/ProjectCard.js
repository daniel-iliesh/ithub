import { BsFillKanbanFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getRandomColor = () => {
  return "hsl(" + Math.random() * 360 + ", 40%, 40%)";
};

const ProjectCard = ({ project }) => {
  const creator = useSelector((state) =>
    state?.reducers?.users?.find((user) => user?._id === project?.creator),
  );

  return (
    <>
      <div className="d-flex flex-column">
        <div>
          <BsFillKanbanFill className="gearsvg" size="35" />
          <Link to={`/project/${project?._id}`} className="mx-2">
            {project?.pname}
          </Link>
        </div>
        <div className="my-1">{project?.description}</div>
        <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
          <div className="d-flex flex-row flex-wrap">
            {project &&
              project?.tags.map((tag, index) => (
                <Link
                  to={`/`}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "",
                    transition: "500ms",
                    padding: "0 5px",
                    borderRadius: "20px",
                    backgroundColor: getRandomColor(),
                    margin: "5px",
                    color: "white",
                  }}
                >
                  #{tag}
                </Link>
              ))}
          </div>
          <div className="my-1">
            Creator:{" "}
            {
              <Link
                style={{ textDecoration: "underline" }}
                to={`/${creator?.username}`}
              >
                {creator?.name}
              </Link>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
