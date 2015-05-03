<?php

	class qa_html_theme_layer extends qa_html_theme_base {

	// init before start
		function doctype() {
			qa_html_theme_base::doctype();
		}
	
	// theme replacement functions
		function main_parts($content) {
			if ((qa_opt('friends_active') && $this->template == 'user')  && (isset($content['raw']['userid']))) { 
				foreach($content as $i => $v) {
					if(strpos($i,'form') === 0) { unset($content[$i]); }
				}	
				
				include 'qa-plugin\friends\qa-friends-db.php';
		
				// Get logged in user and the user profile we're looking it.
				$userid = qa_get_logged_in_userid();
				$profileHandle = qa_request_part(1);
				$profileid = getUseridFromHandle($profileHandle)['userid'];
				
				// If I'm looking at my own profile, I need to know.
				$isOwnProfile = false;
				if ($userid == $profileid) {
					$isOwnProfile = true;
				}
				
				// Have I already friended them, or sent a request?
				$isFriend = checkForExistingFriendship($userid, $profileid);
				$friendRequestSent = checkForExistingRequest($userid, $profileid);
						
				
				$new_buttons = array();

				// Display Add Friend Button
				if (!$isOwnProfile && !$isFriend && !$friendRequestSent) {
					//$test = 'class="qa-form-wide-button qa-form-wide-button-save" name="addFriend" type="button" onclick="window.location.href = \'friend-functions\addFriend\ '.$profileid.';"'
					$new_buttons['addFriend'] = array(
								'tags' => 'class="qa-form-wide-button qa-form-wide-button-save" name="addFriend" type="button" onclick="window.location.href=\'/friend-functions/addFriend/'.$profileid.'/user/'.$profileHandle.'\';"',
								'label' => 'Add Friend',
							);
				}
				
				// Display Remove Friend Request Button
				if (!$isOwnProfile && !$isFriend && $friendRequestSent) {
					$new_buttons['removeFriendRequest'] = array(
								'tags' => 'name="removeFriendRequest" type="button" onclick="window.location.href=\'/friend-functions/removeRequest/'.$profileid.'/user/'.$profileHandle.'\';"',
								'label' => 'Remove Friend Request',
							);
				}				
				
				// Display Remove Friend Button
				if (!$isOwnProfile && $isFriend) {			
				$new_buttons['removeFriend'] = array(
							'tags' => 'class="qa-form-wide-button qa-form-wide-button-block" type="button" onclick="window.location.href=\'/friend-functions/removeFriend/'.$profileid.'/user/'.$profileHandle.'\';"',
							'label' => 'Remove Friend',
						);				
				}
				
				// Merge existing QA buttons with the ones we created.	
				$content['profile-form']['buttons'] = array_merge($content['profile-form']['buttons'], $new_buttons);
			}
			qa_html_theme_base::main_parts($content);
		}	
	}
	