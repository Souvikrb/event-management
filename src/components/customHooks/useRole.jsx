import useApiHandlers from "../../api/ApiHandlers";
import ApiPaths from "../../api/ApiPaths";

const  useRole = () => {
    const { getApiHandler } = useApiHandlers();
    const permissionSet = async () => {
        const fetchedRole = await getApiHandler(ApiPaths.role);
        return fetchedRole;
        
    }
    
    return {permissionSet}
        
}
export default useRole;
