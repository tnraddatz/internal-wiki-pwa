import React from 'react';
import { Auth } from 'aws-amplify';
//import { S3Image } from 'aws-amplify-react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                attributes: {
                    email: 'me@example.com',
                    phone_number: '+1123456789'
                }
            }
        }
    }
    componentDidMount() {
        Auth.currentAuthenticatedUser().then(user => {
            console.log('Cognito User', user);
            this.setState({ user, image_key: 'profile-' + user.attributes.sub + '.jpg' });
        });;
    }

    async onImageLoad(url) {
        console.error('onImageLoad is not yet implemented');
    }

    render() {
        return (<div className="page-unicorns">
            <header className="site-header">
                <div>
                    {/* <S3Image imgKey={this.state.image_key} onLoad={(url) => this.onImageLoad(url)} picker/> */}
                    <table align="center">
                        <tbody>
                            <tr>
                                <td>E-mail:</td>
                                <td>{this.state.user.attributes.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </header>
        </div>
        );
    }
}

export default Profile;