<template>
<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<v-form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Welcome
					</span>
					<span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<b-form-input class="input100" type="text" name="email"></b-form-input>
						<span class="focus-input100" data-placeholder="Email"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<b-form-input class="input100" type="password" name="pass"></b-form-input>
						<span class="focus-input100" data-placeholder="Password"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<b-button class="login100-form-btn">
								Login
							</b-button>
						</div>
					</div>

					<div class="text-center p-t-115">
						<span class="txt1">
							Forgot Password?
						</span>

						<a class="txt2" href="#">
							Reset
						</a>
					</div>
				</v-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'Newlogin'
}
</script>

<style lang="stylus" scoped >

  
  
  
  
</style>