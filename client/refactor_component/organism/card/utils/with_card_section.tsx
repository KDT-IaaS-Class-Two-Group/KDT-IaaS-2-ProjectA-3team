/**
 * @file withCardSection.tsx
 * @brief 카드 섹션 컴포넌트를 생성하기 위한 HOC 파일
 * @details 이 파일은 고차 컴포넌트(Higher-Order Component)를 정의하여, 카드 섹션 레이아웃을 재사용 가능한 방식으로 생성할 수 있게 한다.
 * `WrappedComponent`를 카드 섹션 레이아웃으로 감싸고, 섹션의 스타일, 타이틀, 버튼 텍스트 등을 동적으로 설정할 수 있다.
 *
 * @param {React.ComponentType<any>} WrappedComponent - 카드 섹션으로 감쌀 원본 컴포넌트
 * @param {SectionConfig} sectionConfig - 카드 섹션의 레이아웃과 동작을 설정하는 구성 객체
 * @return 원본 컴포넌트를 카드 섹션 레이아웃으로 감싼 새로운 컴포넌트를 반환
 * @author @dalramjwi
 * @date 2024-08-26
 */

import CardSection from "client/refactor_component/molecule/card_section/card_section";
import React from "react";
import SectionConfig from "./props/with_card_section.props";

/**
 * @function withCardSection
 * @brief 원본 컴포넌트를 카드 섹션 레이아웃으로 감싸는 HOC 함수
 * @details 이 함수는 고차 컴포넌트로, 원본 컴포넌트를 받아 카드 섹션 레이아웃으로 감싸고, 섹션의 레이아웃과 동작을 동적으로 설정할 수 있게 한다.
 * @param {React.ComponentType<any>} WrappedComponent - 카드 섹션으로 감쌀 원본 컴포넌트
 * @param {SectionConfig} sectionConfig - 카드 섹션의 레이아웃과 동작을 설정하는 구성 객체
 * @return {React.FC<any>} 원본 컴포넌트를 카드 섹션 레이아웃으로 감싼 새로운 컴포넌트를 반환
 */
const withCardSection = (
  WrappedComponent: React.ComponentType<any>,
  sectionConfig: SectionConfig
) => {
  return (props: any) => (
    <CardSection
      sectionClassName={sectionConfig.sectionClassName}
      title={sectionConfig.title}
      buttonText={sectionConfig.buttonText}
      //sectionConfig.onClick 함수가 존재할 때만 sectionConfig.onClick(props)가 호출
      onClick={() => sectionConfig.onClick && sectionConfig.onClick(props)}
    >
      <WrappedComponent {...props} />
    </CardSection>
  );
};

export default withCardSection;
