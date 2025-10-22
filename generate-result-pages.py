#!/usr/bin/env python3
"""
테스트 결과 페이지 자동 생성 스크립트
모든 테스트의 결과별 정적 페이지를 생성합니다.
"""

import os
import yaml
import re
from pathlib import Path

# 프로젝트 루트 디렉토리
PROJECT_ROOT = Path(__file__).parent
TESTS_DIR = PROJECT_ROOT / "content" / "tests"

# 이미 생성된 테스트 (건너뛰기)
SKIP_TESTS = ['love-style']

def extract_frontmatter(content):
    """마크다운에서 YAML front matter 추출"""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if match:
        yaml_content = match.group(1)
        return yaml.safe_load(yaml_content)
    return None

def generate_og_description(result, test_title):
    """OG 설명 생성"""
    badge = result.get('badge', '🎯')
    title = result.get('title', '')
    subtitle = result.get('subtitle', '')

    return f"나는 {title}! {badge} {subtitle} 당신의 {test_title} 결과는?"

def generate_result_page(test_id, test_title, test_url, result):
    """개별 결과 페이지 마크다운 생성"""
    result_type = result['type']
    badge = result.get('badge', '🎯')
    title = result.get('title', result_type)
    subtitle = result.get('subtitle', '')
    rarity = result.get('rarity', 10)
    description = result.get('description', '')
    traits = result.get('traits', [])
    recommendation = result.get('recommendation', '')

    # 테스트별 특수 필드
    love_language = result.get('loveLanguage', '')
    compatibility = result.get('compatibility', '')

    # OG 이미지 이름
    og_image = f"og-{test_id}-{result_type}.jpg"

    # OG 설명
    og_description = generate_og_description(result, test_title)

    # 페이지 제목
    page_title = f"{title} {badge} | {test_title} 결과"

    # 마크다운 생성
    md = f"""---
title: "{page_title}"
date: 2025-01-22
description: "{subtitle}! {description[:100]}..."
summary: "{subtitle} - {title}"
layout: "result"
type: "result"

# Test Info
testId: "{test_id}"
testTitle: "{test_title}"
testUrl: "{test_url}"

# Result Info
resultType: "{result_type}"
badge: "{badge}"
resultTitle: "{title}"
subtitle: "{subtitle}"
rarity: {rarity}

# OG Tags for Social Sharing
ogImage: "{og_image}"
ogDescription: "{og_description}"

# Result Content
description: "{description}"
"""

    # Traits 추가
    if traits:
        md += "\ntraits:\n"
        for trait in traits:
            md += f'  - "{trait}"\n'

    # Love Language (연애 테스트 전용)
    if love_language:
        md += f'\nloveLanguage: "{love_language}"\n'

    # Recommendation
    if recommendation:
        md += f'\nrecommendation: "{recommendation}"\n'

    # Compatibility (연애 테스트 전용)
    if compatibility:
        md += f'\ncompatibility: "{compatibility}"\n'

    md += "---\n"

    return md

def process_test_file(test_file):
    """테스트 파일을 읽고 결과 페이지들을 생성"""
    print(f"\n처리 중: {test_file.name}")

    # 테스트 ID 추출
    test_id = test_file.stem

    # 이미 생성된 테스트는 건너뛰기
    if test_id in SKIP_TESTS:
        print(f"  ⏭️  건너뜀 (이미 생성됨)")
        return

    # 파일 읽기
    with open(test_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Front matter 추출
    frontmatter = extract_frontmatter(content)
    if not frontmatter:
        print(f"  ❌ Front matter를 찾을 수 없음")
        return

    # 테스트 정보
    test_title = frontmatter.get('title', test_id)
    results = frontmatter.get('results', [])

    if not results:
        print(f"  ❌ 결과가 없음")
        return

    print(f"  📊 결과: {len(results)}개")

    # 결과 디렉토리 생성
    result_dir = TESTS_DIR / test_id
    result_dir.mkdir(exist_ok=True)

    # 각 결과별 페이지 생성
    for result in results:
        result_type = result['type']
        result_title = result.get('title', result_type)

        # 결과 페이지 생성
        test_url = f"/tests/{test_id}/"
        page_content = generate_result_page(test_id, test_title, test_url, result)

        # 파일 저장
        result_file = result_dir / f"{result_type}.md"
        with open(result_file, 'w', encoding='utf-8') as f:
            f.write(page_content)

        print(f"    ✅ {result_type}.md - {result_title}")

def main():
    """메인 함수"""
    print("=" * 60)
    print("테스트 결과 페이지 자동 생성 스크립트")
    print("=" * 60)

    # 모든 테스트 파일 찾기
    test_files = list(TESTS_DIR.glob("*.md"))
    test_files = [f for f in test_files if f.stem not in SKIP_TESTS]

    print(f"\n총 {len(test_files)}개 테스트 파일 발견")
    print(f"건너뛸 테스트: {', '.join(SKIP_TESTS)}")

    # 각 테스트 파일 처리
    total_pages = 0
    for test_file in test_files:
        try:
            process_test_file(test_file)
            # 생성된 페이지 수 계산
            test_id = test_file.stem
            result_dir = TESTS_DIR / test_id
            if result_dir.exists():
                pages = len(list(result_dir.glob("*.md")))
                total_pages += pages
        except Exception as e:
            print(f"  ❌ 에러: {e}")

    print("\n" + "=" * 60)
    print(f"✅ 완료! 총 {total_pages}개 결과 페이지 생성됨")
    print("=" * 60)
    print("\n다음 단계:")
    print("1. hugo --cleanDestinationDir")
    print("2. git add content/tests/")
    print("3. git commit -m 'Add all test result pages'")

if __name__ == "__main__":
    main()
