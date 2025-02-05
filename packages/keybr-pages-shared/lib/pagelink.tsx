import { allLocales, defaultLocale, type LocaleId } from "@keybr/intl";
import { type ClassName, Link } from "@keybr/widget";
import { type ComponentType, type ElementType, type ReactNode } from "react";
import { type IntlShape, type MessageDescriptor, useIntl } from "react-intl";
import { usePageData } from "./pagedata.tsx";

export type IconProps = {
  readonly className?: ClassName;
};

export class PageLinkTemplate<T = null> {
  readonly path: string;
  readonly name: MessageDescriptor;
  readonly title: MessageDescriptor;
  readonly icon?: ComponentType<IconProps>;

  constructor({
    path,
    name,
    title,
    icon,
  }: {
    readonly path: string;
    readonly name: MessageDescriptor;
    readonly title: MessageDescriptor;
    readonly icon?: ComponentType<IconProps>;
  }) {
    this.path = path;
    this.name = name;
    this.title = title;
    this.icon = icon;
  }

  bind(params: T): BoundPageLink<T> {
    return new BoundPageLink<T>(this, params);
  }
}

export class BoundPageLink<T = null> {
  constructor(
    private readonly link: PageLinkTemplate<T>,
    private readonly params: T,
  ) {}

  formatPath(locale: LocaleId): string {
    const map = new Map(Object.entries(this.params ?? {}));
    const path = this.link.path
      .split("/")
      .map((segment) => {
        if (segment.startsWith(":")) {
          const key = segment.substring(1);
          const value = map.get(key);
          if (value == null) {
            throw new Error();
          }
          return String(value);
        } else {
          return segment;
        }
      })
      .join("/");
    if (locale === defaultLocale) {
      return path;
    } else {
      if (path === "/") {
        return `/${locale}/index`;
      } else {
        return `/${locale}${path}`;
      }
    }
  }

  format(
    intl: IntlShape,
    locale: string = intl.locale,
  ): {
    readonly path: string;
    readonly name: string;
    readonly title: string;
    readonly icon?: ComponentType<IconProps>;
  } {
    const {
      link: { name, title, icon },
      params,
    } = this;
    return {
      path: this.formatPath(locale as LocaleId),
      name: intl.formatMessage(name, params as any),
      title: intl.formatMessage(title, params as any),
      icon: icon,
    };
  }
}

export function PageLink({
  link,
  target,
  component: Component = Link,
  className,
  children,
}: {
  readonly link: BoundPageLink<any>;
  readonly target?: string;
  readonly component?: ElementType<{
    readonly href: string;
    readonly target?: string;
    readonly title?: string;
    readonly className?: ClassName;
    readonly children: ReactNode;
  }>;
  readonly className?: ClassName;
  readonly children?: (link: {
    readonly path: string;
    readonly name: string;
    readonly title: string;
    readonly icon?: ComponentType<IconProps>;
  }) => ReactNode;
}): ReactNode {
  const intl = useIntl();
  const { path, name, title, icon } = link.format(intl);
  return (
    <Component className={className} href={path} target={target} title={title}>
      {typeof children === "function"
        ? children({ path, name, title, icon })
        : name}
    </Component>
  );
}

declare class URL {
  constructor(url: string, base: string);
}

export function AltLangLinks({
  pageLink,
}: {
  readonly pageLink: BoundPageLink;
}): ReactNode {
  const { base } = usePageData();
  const links = allLocales.map((locale) => ({
    href: String(new URL(pageLink.formatPath(locale), base)),
    rel: "alternate",
    hrefLang: locale,
  }));

  return links.map((link) => <link key={link.href} {...link} />);
}
