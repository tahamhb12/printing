import { createContext,useEffect,useState,useContext } from "react";
import supabase from "../helpler/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    
    const [session,setSession] = useState()
    const navigate = useNavigate()
    const [products, setproducts] = useState([]);
    const categories = [
      'publicité industrielle',
      'papeterie',
      'gadget ',
    ];

    
    
// Sign Up
    const signUp = async ({ email, password }) => {
        try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            alert(error.message);
            return;
        }
        if (data.user) {
            alert('User created successfully.');
        }
        } catch (err) {
        console.error('Unexpected error:', err);
        alert('Something went wrong. Please try again.');
        }
    };
  
  // Sign In
  const signIn = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (data.session) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong. Please try again.');
    }
  };
  
    
    //SignOut 
    const signOut = async() => {
      const {error} = await supabase.auth.signOut()
      if(error){
          console.log(error);
      }
      navigate('/login')
  }
  
    useEffect(()=>{
        supabase.auth.getSession().then(({data:{session}})=>{
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event,session)=>{
            setSession(session)
        })
      },[])

    //fetch products
    useEffect(() => {
      fetchProducts();
    }, []);
    //fetch products
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id,name,price,description,category,image_url');
      if (error) {
        console.log(error);
      } else {
        setproducts(data);
      }
    };


    return (
        <AuthContext.Provider value={{session,signOut,signUp,signIn,products,setproducts,categories}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(AuthContext);
}