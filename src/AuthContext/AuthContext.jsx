import { createContext,useEffect,useState,useContext } from "react";
import supabase from "../helpler/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    
    const [session,setSession] = useState()
    const navigate = useNavigate()
    const [products, setproducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 9;
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

    //fetch products with pagination
    const fetchProducts = async (page = 1, category = 'all', search = '') => {
      try {
        let query = supabase
          .from('products')
          .select('id,name,price,description,category,image_url,variants', { count: 'exact' });

        // Apply category filter if not 'all'
        if (category !== 'all') {
          query = query.eq('category', category);
        }

        // Apply search filter if search term exists
        if (search) {
          query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
        }

        // Get total count with filters
        const { count, error: countError } = await query;

        if (countError) {
          console.error('Error getting count:', countError);
          return;
        }

        // Calculate total pages
        const total = Math.ceil(count / productsPerPage);
        setTotalPages(total);

        // Fetch paginated products with filters
        const { data, error } = await query
          .range((page - 1) * productsPerPage, page * productsPerPage - 1)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        setproducts(data);
        setCurrentPage(page);
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    // Handle page change
    const handlePageChange = (newPage, category = 'all', search = '') => {
      if (newPage >= 1 && newPage <= totalPages) {
        fetchProducts(newPage, category, search);
      }
    };

    useEffect(() => {
      fetchProducts(1);
    }, []);

    return (
        <AuthContext.Provider value={{
          session,
          signOut,
          signUp,
          signIn,
          products,
          setproducts,
          categories,
          currentPage,
          totalPages,
          handlePageChange
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(AuthContext);
}