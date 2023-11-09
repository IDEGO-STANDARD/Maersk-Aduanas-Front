import { useParams } from "react-router-dom";

function PageReload(WrappedComponent, paramName) {

    function NewComponent(props) {
      
      let params = useParams();

      return <WrappedComponent  key={params[paramName]}/>;
    }
    return NewComponent;

}

export default PageReload;