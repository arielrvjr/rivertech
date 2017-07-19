
var loginService= function($log,$rootScope,$firebaseAuth, $location,$mdToast){
	var auth = $firebaseAuth();
	function loginWithProvider(provider) { 
		auth.$signInWithPopup(provider).then(function(result) {
			$log.debug("$signInWithPopup Signed in as:", result);
			var token = result.credential.accessToken;
			/*$rootScope.user = result.user;*/
			$log.debug(result);
		}).catch(function(error) {
			$log.debug("Authentication failed:", error);
			if ("auth/operation-not-allowed" === error.code){
				mensaje = "método de autenticación no implementado."
			}
			else {
				mensaje = error.message;
			}
			$mdToast.show(
            $mdToast.simple()
              .textContent(mensaje)
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
		});

	};

	auth.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			$log.debug("$onAuthStateChanged - Signed in as:", firebaseUser);
			$rootScope.user = firebaseUser;
			if (!$rootScope.user["photoURL"]){
				$log.debug('Inicial de Email: ',$rootScope.user.email[0].toUpperCase());
				$rootScope.user.placeholder = "http://via.placeholder.com/30/448aff/ffffff?text="+$rootScope.user.email[0].toUpperCase();
				$log.debug('Usuario con placeholder',$rootScope.user);
			}
		} else {
			$log.debug("Signed out");
		}
		$location.path('/');
	});

	function loginSimple(user){
		auth.$signInWithEmailAndPassword(user.email, user.password)
			.then(function(firebaseUser) {
  				$log.debug("Signed in as:", firebaseUser.uid);
			}).catch(function(error) {
  			$log.debug("Authentication failed:", error);
  			$mdToast.show(
            $mdToast.simple()
              .textContent(error.message)
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
			});
	}

	return {
		currentUser: function(){return auth.$getAuth()},
		logout: function(){return auth.$signOut().then(function(){
			$rootScope.user = null;
		})},
		login: function(user){
			$log.debug('LoginService.login:', user);
			return loginSimple(user);
			
		},
		register:function(user){
			auth.$createUserWithEmailAndPassword(user.email, user.password)
  			.then(function(firebaseUser) {
    		$log.debug("User " + firebaseUser.uid + " created successfully!");
  			}).catch(function(error) {
    		console.error("Error: ", error);
    		$mdToast.show(
            $mdToast.simple()
              .textContent(error.message)
              .toastClass('md-warn')
              .position('bottom right')
              .hideDelay(3000)
          );
  			});
		},
		loginFacebook: function(){return loginWithProvider(new firebase.auth.FacebookAuthProvider());},
		loginGoogle: function(){return loginWithProvider(new firebase.auth.GoogleAuthProvider());},
	};
};
module.exports = /*@ngInject*/  loginService;
