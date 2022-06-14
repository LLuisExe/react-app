
const Previous = ({ onPreviousPage = () => {} }) => {


    return (
        <div className="m-4">
            <button className="bg-indigo-800 rounded-full text-white w-20"
            onClick={() => {
                onPreviousPage();
              }}>
                Anterior
            </button>
        </div>
    );
}

export default Previous;