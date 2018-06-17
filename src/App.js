import React, { Component } from "react";
import "./App.css";

class App extends Component {
  // state
  state = {
    //  인풋
    input: "",
    // 더미 데이터
    contactData: [
      { name: "박예영", phone: "010-1234-5678", School : "한세사이버보안고등학교"   },
      { name: "윤지훈", phone: "010-8765-4321", School : "한세사이버보안고등학교"   },
      { name: "김민서", phone: "010-1253-1235", School : "한세사이버보안고등학교"   },
      { name: "박건령", phone: "010-4839-9743", School : "한세사이버보안고등학교"   },
      { name: "조수현", phone: "010-3948-2819", School : "한세사이버보안고등학교"   },
      { name: "인승진", phone: "010-2384-3823", School : "한세사이버보안고등학교"   },
      { name: "김민구", phone: "010-2304-4893", School : "한세사이버보안고등학교"   },
      { name: "이지훈", phone: "010-2038-2384", School : "한세사이버보안고등학교"   },
      { name: "김민규", phone: "010-1239-2342", School : "한세사이버보안고등학교"   },
      { name: "최용현", phone: "010-8372-9393", School : "한세사이버보안고등학교"   },
      { name: "박건령", phone: "010-0000-0000", School : "한세사이버보안고등학교"   }
    ],
    // 입력 할 때의 데이터
    addName: "",
    addPhone: "",
    change: "",
    changeName: "",
    changePhone: "",
    deleteInput: "",
    addSchool: ""
  };

  // 글자 바꾸는 메소드
  handleChange = e => {
    // JS 의 대문자로 감싸면 그 변수의 값이 나옴을 이용해서, input 태그의 name === state의 변수값과 똑같도록 설계,
    // 그렇게 인풋 값을 업데이트.
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // 고객의 데이터를 추가하는 메소드
  handleAddInfo = () => {
    /*
      콧수염 문법: 예를 들어서, this state 안에 있는 contactData를 불러온다고 할 때, 중괄호에 감싸서 호출.
      이렇게 되면 contactData를 이용해야할 때, this.state.contactData 대신 contactData만 해도 호출 가능.
    */
    const { contactData, addName, addPhone, addSchool } = this.state;

    // 현재 입력값과 기존 이름 데이터를 비교, 있으면 중복 데이터 리턴, => 배열 length 증가
    const exist = contactData.filter(DATA => {
      return DATA.name === addName;
    });

    // 맞는 이름이 있을때
    if (exist.length !== 0) {
      alert("중복된 이름이라서 추가 불가능 합니다");
    } else {
      // 맞는 이름이 없을 때는 값을 추가
      // 업데이트
      this.setState({
        /*
          여기서 [...contactData, { name: addName, phone: addPhone }] 라는 것은, 위에서 할당한 contactData의 전부를 넣는다는 뜻
          그 후 { name: addName, phone: addPhone } 객체를 합하여 데이터를 합친다는 것을 의미.
        */
        contactData: [...contactData, { name: addName, phone: addPhone, school: addSchool}],
        addName: "",
        addPhone: "",
        addSchool: ""
      });
    }
  };

  // 고객의 정보를 바꾸어 주는 메소드
  handleChangeInfo = () => {
    const { contactData, changeName, changePhone, changeSchool } = this.state;

    const exist = contactData.filter(DATA => {
      return DATA.name === this.state.change;
    });

    // 맞는 이름이 있을때
    if (exist.length !== 0) {
      /*
        contactData.map 함수를 통해서, 각 각의 루프마다
        이름이 같은지 비교를 하고, 만약 같을 때에는 바꾸어야 하는 값으로 바꾸어서 리턴.
        그 값을 setState를 통해 적용.
      */
      this.setState({
        contactData: contactData.map((object, i) => {
          if (object.name === exist[0].name) {
            object.name = changeName;
            object.phone = changePhone;
            object.school = changeSchool;
          }
          return object;
        }),
        changeName: "",
        changePhone: "",
        changeSChool: ""
      });
    } else {
      // 맞는 이름이 없을때
      alert("올바른 이름을 입력해 주세요.");
    }
  };

  // 고객 정보 삭제 메소드
  handleDeleteInfo = () => {
    const { contactData, deleteInput } = this.state;

    // 삭제하려면 데이터와 같지 않은 모든 데이터를 저장, 삭제하려는 데이터는 제거.
    const exist = contactData.filter(DATA => {
      return DATA.name !== deleteInput;
    });

    /*
      삭제가 제대로 이루어졌는지에 대한 검증.
      만약 숫자가 같다면 필터링이 되지 않은 것이므로, 삭제가 안된 것으로 간주하고,
      숫자가 다르다면, 정상적인 처리로 간주함.
    */
    if (exist.length !== contactData.length) {
      this.setState({
        contactData: exist,
        deleteInput: ""
      });
    } else {
      alert("올바른 이름을 입력해 주세요.");
    }
  };

  // 고객 정보 데이터가 변경될 때마다 콘솔에 contact 데이터 출력
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contactData !== this.state.contactData) {
      console.log(this.state.contactData);
    }
  }

  render() {
    const showTheData = data => {
      /*
        파라미터인 data는 this.state.contactData 이다
        그 데이터를 검증해 주는데,
        this.state.input을 기준으로 삼아 data를 정렬한다
        그 후, 그 정렬된 데이터를 return 해줌으로써 사용자에게 고객 정보가 보여지게 된다
      */
      // data 정렬시킴
      data.sort();
      data = data.filter(DATA => {
        return DATA.name.indexOf(this.state.input) > -1;
      });

      // 정렬된 데이터 리턴
      return data.map((object, i) => {
        return (
          <div className="people" key={i}>
            {object.name}: {object.phone}: {object.school}
          </div>
        );
      });
    };

    return (
    <div className="background-img">
      <div className="main">
        <div className="subject">
          <h1>고객 정보 관리 서비스</h1>
        </div>
        <div className="work">
          <div className="search">
            <input
              className="inputANI"
              type="text"
              name="input"
              value={this.state.input}
              placeholder="검색"
              onChange={this.handleChange}
            />
          </div>
          <div className="flex">
            <div className="contact">
              고객 정보 목록
              {showTheData(this.state.contactData)}
            </div>
            <div className="change">
              <div className="change-box">
                회원 정보 추가
                <input
                  className="inputANI"
                  type="text"
                  name="addName"
                  placeholder="이름 적으세요"
                  value={this.state.addName}
                  onChange={this.handleChange}
                />
                <input
                  className="inputANI"
                  type="text"
                  name="addPhone"
                  placeholder="전화번호 적으세요"
                  value={this.state.addPhone}
                  onChange={this.handleChange}
                />
                <button className="button button1" onClick={this.handleAddInfo}>
                  추가
                </button>
              </div>
              <div className="change-box">
                회원 정보 변경
                <input
                  className="input inputANI"
                  type="text"
                  name="change"
                  placeholder="바꿀 대상 이름"
                  value={this.state.change}
                  onChange={this.handleChange}
                />
                <input
                  className="inputANI"
                  type="text"
                  name="changeName"
                  placeholder="바꿀 이름"
                  value={this.state.changeName}
                  onChange={this.handleChange}
                />
                <input
                  className="input inputANI"
                  type="text"
                  name="changePhone"
                  placeholder="전화번호"
                  value={this.state.changePhone}
                  onChange={this.handleChange}
                />
                <button className="button button1" onClick={this.handleChangeInfo}>
                  변경
                </button>
              </div>
              <div className="change-box">
                회원 정보 삭제<input
                  className="input inputANI"
                  type="text"
                  name="deleteInput"
                  value={this.state.deleteInput}
                  placeholder="이름 적으세요"
                  onChange={this.handleChange}
                />
                <button className="button button1" onClick={this.handleDeleteInfo}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
