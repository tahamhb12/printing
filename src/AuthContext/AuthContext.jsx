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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const productsPerPage = 9;
    const categories = [
      'publicité industrielle',
      'papeterie',
      'gadget',
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
    const fetchProducts = async (page = 1, category = 'all', search = '', sortBy = 'name') => {
      try {
        setIsLoading(true);
        setError(null);
        
        let query = supabase
          .from('products')
          .select('id,name,price,description,category,image_url,variants', { count: 'exact' });

        // Apply category filter if not 'all'
        if (category !== 'all') {
          query = query.eq('category', category);
        }

        // Apply search filter if search term exists
        if (search && search.trim() !== '') {
          const searchTerm = search.trim();
          // Search in both name and description within the current category
          query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }

        // Apply sorting
        switch (sortBy) {
          case 'name':
            query = query.order('name', { ascending: true });
            break;
          case 'price-low':
            query = query.order('price', { ascending: true });
            break;
          case 'price-high':
            query = query.order('price', { ascending: false });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }

        // Get total count with filters
        const { count, error: countError } = await query;

        if (countError) {
          console.error('Error getting count:', countError);
          setError('Error fetching product count');
          return;
        }

        // Calculate total pages
        const total = Math.ceil(count / productsPerPage);
        setTotalPages(total || 1);

        // Reset to page 1 if current page is greater than total pages
        const currentPage = Math.min(page, total || 1);

        // Fetch paginated products with filters
        const { data, error } = await query
          .range((currentPage - 1) * productsPerPage, currentPage * productsPerPage - 1);

        if (error) {
          console.error('Error fetching products:', error);
          setError('Error fetching products');
          return;
        }

        setproducts(data || []);
        setCurrentPage(currentPage);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
        setproducts([]);
        setTotalPages(1);
        setCurrentPage(1);
      } finally {
        setIsLoading(false);
      }
    };

    // Handle page change
    const handlePageChange = (newPage, category = 'all', search = '', sortBy = 'name') => {
      if (newPage >= 1 && newPage <= totalPages) {
        fetchProducts(newPage, category, search, sortBy);
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
          handlePageChange,
          isLoading,
          error
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = ()=>{
    return useContext(AuthContext);
}