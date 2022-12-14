const advancedResults = (model, populate) => async(req, res)=>{

    let query;

    //copy req.query object 
    const reqQuery = {...req.query}

    //Fileds to exclude
    const removeFields = ['select','sort', 'page', 'limit'];

    //Loop over fields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //Create querystring 
    let quertyString = JSON.stringify(reqQuery);

    //Create Operators ($gt, $lte, etc)
    quertyString = quertyString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //Find resources
    query = model.find(JSON.parse(quertyString));
    // console.log('bootcamps.js line 30: ', query);

    //SELECT FIELDS
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        
        query = query.select(fields);
    }

    //SORT
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');

        query = query.sort(sortBy);
    }else{
        query = query.sort('-createdAt')
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page -1) * limit;
    const endIndex  = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate){
        query = query.populate(populate);
    }

    const result = await query;
    
    //Pagination Result
    const pagination = {};

    if(endIndex < total)
    {
        pagination.next = {
            page:page+1,
            limit
        }
    }

    if(startIndex > 0){
        pagination.previous = {
            page: page -1,
            limit
        }
    }

    res.advancedResults = {
        success:true,
        count: result.length,
        pagination,
        data:result
    }
    next();

}

module.exports = advancedResults;