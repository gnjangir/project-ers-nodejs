const User = require('../models/user'); 

// redering the singIN page
module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title : 'ERS | Sign-In'
    });
}
// creating the session, for logging In
module.exports.createSession = async function(req, res){
    // console.log(req.body);
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

//  rendering the signUp page

module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title : 'ERS | SignUp'
    });
}

// creating the new user
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        //flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

//  logging Out
module.exports.destroySession = function (req, res, done){
    return req.logout((err) =>{
        if(err){
            return done(err);
        }
        req.flash('success' , 'Logged Out Sucessfully !');
        return res.redirect('/users/sign-in');
    });
    
}

// forrget password page

module.exports.forgetPasswordPage = function(req, res){
    return res.render('forget_password',{
        title : 'Forget Password'
    });
}
//  update the existing password   . with the newly created password.
module.exports.forgetPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    //console.log(user);
    //console.log(req.body);
    if(!user){
        return res.redirect('/users/signUp');
    }
    if(req.body.password == req.body.confirmPassword){
        req.flash('success' , 'Password Changed :)');
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');

}

// Adding employe
//  redirect  to the sing-in page
module.exports.addEmployeee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        // flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/admin/view-employee');
    }
    return res.redirect('back');
}

// making the new Admin, it is admin specific
module.exports.makeAdmin = async function(req, res){
    try {
        if (req.body.admin_password == 'monkey') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error', error);
        return;
    }
}
